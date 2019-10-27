const User = require('../models/User')
const S3 = require('../../plugins/S3')

const UserService = {
  get() {
    return new Promise((resolve, reject) => {
      User.find()
        .select({
          email: 0,
          password: 0
        })
        .exec((err, users) => {
          if (err) return reject(err)
          return resolve(users[0])
        })
    })
  },
  setProfilePicture(file) {
    return new Promise((resolve, reject) => {
      User.findOne({}).exec((err, user) => {
        if (err) return reject(err)
        const params = {
          Bucket: process.env.BUCKET,
          Key: user._id.toString(),
          Body: file.data
        }
        S3.createBucket(() => {
          S3.upload(params, err => {
            if (err) return reject(err)
            return resolve()
          })
        })
      })
    })
  },
  edit(user) {
    return new Promise((resolve, reject) => {
      User.updateOne(
        {},
        {
          $set: {
            name: user.name,
            description: user.description
          }
        }
      ).exec(err => {
        if (err) return reject(err)
        return resolve()
      })
    })
  },
  getImage() {
    return new Promise((resolve, reject) => {
      User.find().exec((err, users) => {
        if (err || users.length <= 0) return reject(new Error('no image'))
        const id = users[0]._id
        S3.getObject(
          {
            Bucket: process.env.BUCKET,
            Key: id.toString()
          },
          (err, data) => {
            if (err) return reject(new Error('no image'))
            return resolve(data.Body)
          }
        )
      })
    })
  }
}

module.exports = UserService
