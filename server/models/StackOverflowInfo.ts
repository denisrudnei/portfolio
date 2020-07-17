const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StackOverFlowInfoSchema = new Schema({
  userId: {
    type: Schema.Types.String,
    required: true
  },
  siteUrl: {
    type: Schema.Types.String,
    required: true
  }
})

module.exports = mongoose.model('StackOverflowInfo', StackOverFlowInfoSchema)
