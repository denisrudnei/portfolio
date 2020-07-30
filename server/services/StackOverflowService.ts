import { differenceInDays } from 'date-fns';
import axios from 'axios';
import StackOverflowInfo from '../models/StackOverflowInfo';
import StackOverflowCache from '../models/StackOverflowCache';
import Question from '../models/stackTypes/Question';

class StackOverflowService {
  public static async create(info: StackOverflowInfo): Promise<StackOverflowInfo> {
    const stackInfo = await StackOverflowInfo.findOne({});
    if (!stackInfo) {
      const newStackOverflowInfo = StackOverflowInfo.create(info);
      return newStackOverflowInfo.save();
    }
    stackInfo.userId = info.userId;
    stackInfo.siteUrl = info.siteUrl;
    const result = await stackInfo.save();
    await this.invalidateCache();
    return result;
  }

  public static getInfo() {
    return StackOverflowInfo.findOne();
  }

  public static async getQuestions(): Promise<Question[]> {
    const cache = await StackOverflowCache.findOne({});

    if (!cache) {
      const items = await this.downloadFromSite();

      const newCache = await StackOverflowCache.create({
        items,
        lastModifiedDate: new Date(),
      });
      await newCache.save();
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

  public static async invalidateCache() {
    await StackOverflowCache.delete({});
    await this.downloadFromSite();
  }

  private static async downloadFromSite(): Promise<Question[]> {
    const info = await this.getInfo();
    if (!info) return [];
    const { userId, siteUrl } = info;
    const { data } = await axios.get(`https://api.stackexchange.com/users/${userId}/questions?site=${siteUrl}&filter=unsafe`);
    return data.items;
  }
}

export default StackOverflowService;
