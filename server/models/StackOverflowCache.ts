const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StackOverflowCache = new Schema({
  lastModifiedDate: {
    type: Schema.Types.Date,
    default: Date.now
  },
  items: {
    type: Schema.Types.Mixed,
    default: []
  }
})

module.exports = mongoose.model('StackOverflowCache', StackOverflowCache)
