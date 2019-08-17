const mongoose = require('mongoose')
const Post = require('../models/Post')

const PostService = {
  getAll() {
    return new Promise((resolve, reject) => {
      Post.find({}).exec((err, posts) => {
        if (err) return reject(err)
        return resolve(posts)
      })
    })
  },

  getOne(url) {
    return new Promise((resolve, reject) => {
      Post.findOne({
        url: decodeURIComponent(url)
      }).exec((err, post) => {
        if (err) return reject(err)
        return resolve(post)
      })
    })
  },

  create(post) {
    return new Promise((resolve, reject) => {
      Post.create(
        {
          _id: new mongoose.Types.ObjectId(),
          title: post.title,
          content: post.content
        },
        err => {
          if (err) return reject(err)
          return resolve()
        }
      )
    })
  },

  remove(postId) {
    return new Promise((resolve, reject) => {
      Post.deleteOne({
        _id: postId
      }).exec(err => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }
}

module.exports = PostService
