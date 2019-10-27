const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  link: {
    type: String
  }
})

module.exports = mongoose.model('Project', ProjectSchema)
