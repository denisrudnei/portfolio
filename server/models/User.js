const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: 0
  },
  image: {
    type: String,
    required: false
  }
})

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()
  const salt = bcrypt.genSaltSync(12)
  bcrypt.hash(user.password, salt, function(err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

UserSchema.methods.verifyPassword = function(password, next) {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) return next(err)
    return next(null, result)
  })
}

module.exports = mongoose.model('User', UserSchema)
