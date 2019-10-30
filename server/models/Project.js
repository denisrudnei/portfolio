const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')

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
  url: {
    type: String,
    default: ''
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

ProjectSchema.pre('save', function() {
  this.url = slugify(this.name, {
    replacement: '-',
    lower: true
  })
})

module.exports = mongoose.model('Project', ProjectSchema)
