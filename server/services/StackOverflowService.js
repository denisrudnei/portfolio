const axios = require('axios')
const { differenceInDays } = require('date-fns')
const StackOverflowInfo = require('../models/StackOverflowInfo')
const StackOverflowCache = require('../models/StackOverflowCache')

class StackOverflowService {
  create(info) {
    return new Promise((resolve, reject) => {
      StackOverflowInfo.findOne({}, (err, stackInfo) => {
        if (err) return reject(err)
        if (!stackInfo) {
          StackOverflowInfo.create(info, (err, result) => {
            if (err) return reject(err)
            this.forceCacheUpdate()
            return resolve(result)
          })
        } else {
          StackOverflowInfo.updateOne({
            _id: stackInfo._id
          }, {
            $set: {
              userId: info.userId,
              siteUrl: info.siteUrl
            }
          }).exec((err) => {
            if (err) return reject(err)
            this.forceCacheUpdate()
            return resolve()
          })
        }
      })
    })
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      StackOverflowInfo.findOne({}, (err, stackInfo) => {
        if (err) return reject(err)
        return resolve(stackInfo)
      })
    })
  }

  getQuestions() {
    return new Promise((resolve, reject) => {
      StackOverflowCache.findOne({}, async (err, cache) => {
        if (err) return reject(err)
        if (!cache) {
          const items = await this.downloadFromSite()
          StackOverflowCache.create({
            items
          }, (err, result) => {
            if (err) return reject(err)
            return resolve(result.items)
          })
        } else if (differenceInDays(cache.lastModifiedDate, Date.now()) > 14) {
          const items = await this.downloadFromSite()
          StackOverflowCache.updateOne({
            _id: cache._id
          }, {
            $set: {
              lastModifiedDate: Date.now(),
              items
            }
          }).exec((err) => {
            if (err) return reject(err)
            return resolve(items)
          })
        } else {
          return resolve(cache.items)
        }
      })
    })
  }

  forceCacheUpdate() {
    return new Promise((resolve, reject) => {
      StackOverflowCache.findOne({}, async (err, cache) => {
        if (err) return reject(err)
        if (!cache) {
          const items = await this.downloadFromSite()
          StackOverflowCache.create({
            items
          }, (err) => {
            if (err) return reject(err)
            return resolve()
          })
        } else {
          const items = await this.downloadFromSite()
          StackOverflowCache.updateOne({
            _id: cache._id
          }, {
            $set: {
              lastModifiedDate: Date.now(),
              items
            }
          }).exec((err) => {
            if (err) return reject(err)
            return resolve()
          })
        }
      })
    })
  }

  async downloadFromSite() {
    const info = await this.getInfo()
    if (!info) return []
    const { userId, siteUrl } = info
    const { data } = await axios.get(`https://api.stackexchange.com/users/${userId}/questions?site=${siteUrl}&filter=unsafe`)
    return data.items
  }
}

module.exports = new StackOverflowService()
