import { differenceInDays } from 'date-fns';
import axios from 'axios';
import StackOverflowInfo from '../models/StackOverflowInfo';
import StackOverflowCache from '../models/StackOverflowCache';

class StackOverflowService {
  public static async create(info: StackOverflowInfo): Promise<StackOverflowInfo> {
    const stackInfo = await StackOverflowInfo.findOne({});
    if (!stackInfo) {
      const newStackOverflowInfo = StackOverflowInfo.create(info);
      return newStackOverflowInfo.save();
    }
    stackInfo.userId = info.userId;
    stackInfo.siteUrl = info.siteUrl;
    return stackInfo.save();
  }

  public static getInfo() {
    return StackOverflowInfo.find({});
  }

  public static async getQuestions(): Promise<any[]> {
    const cache = await StackOverflowCache.findOne({}).exec();

    if (!cache) {
      const items = await this.downloadFromSite();
      const newCache = await StackOverflowCache.create({
        ...items,
      });
      return newCache.items;
    } if (differenceInDays(cache.lastModifiedDate, Date.now()) > 14) {
      const items = await this.downloadFromSite();
      cache.lastModifiedDate = new Date();
      cache.items = items;
      await cache.save();
      return cache.items;
    }
    return cache.items;
  }

  private static async downloadFromSite() {
    const info = await this.getInfo();
    if (!info) return [];
    const { userId, siteUrl } = info[0];
    const { data } = await axios.get(`https://api.stackexchange.com/users/${userId}/questions?site=${siteUrl}&filter=unsafe`);
    return data.items;
  }
}

export default StackOverflowService;
