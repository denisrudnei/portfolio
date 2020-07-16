const axios = require('axios')
const StackOverflowInfo = require('../models/StackOverflowInfo')

class StackOverflowService {
  create(info) {
    return new Promise((resolve, reject) => {
      StackOverflowInfo.findOne({}, (err, stackInfo) => {
        if (err) return reject(err)
        if (!stackInfo) {
          StackOverflowInfo.create(info, (err, result) => {
            if (err) return reject(err)
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

  async getQuestions() {
    const info = await this.getInfo()
    if (!info) return []
    const { userId, siteUrl } = info
    const { data } = await axios.get(`https://api.stackexchange.com/users/${userId}/questions?site=${siteUrl}&filter=unsafe`)
    return data.items
  }
}

module.exports = new StackOverflowService()
