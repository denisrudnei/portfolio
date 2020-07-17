const mongoose = require('mongoose')
const User = require('../models/User')
const AuthService = {
  login (email, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        email
      })
        .select('+password')
        .exec((err, user) => {
          if (err || user === null) return reject(err)
          user.verifyPassword(password, (err, result) => {
            if (err || !result) return reject(err)
            return resolve(user)
          })
        })
    })
  },

  create (toRegister) {
    return new Promise((resolve, reject) => {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        email: toRegister.username,
        name: toRegister.name,
        password: toRegister.password
      }
      if (User.find({}).size() >= 1) { return reject(new Error('primary user already registered')) }
      User.create(user, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }
}

module.exports = AuthService
