const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { format } = require('date-fns')
const slugify = require('slugify')

const PostSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    /* get: getUrl, */
    default: getUrl
  }
})

function getUrl () {
  const title = slugify(this.title, {
    replacement: '-'
  })
  return `${format(this.created, 'YYYY/MM/D')}/${title}`
}

PostSchema.set('toObject', {
  getters: true,
  virtuals: true
})

PostSchema.set('toJSON', {
  getters: true,
  virtuals: true
})

module.exports = mongoose.model('Post', PostSchema)
