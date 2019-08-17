const mongoose = require('mongoose')
const Project = require('../models/Project')
const S3 = require('../../plugins/S3')
const PostService = {
  getAll() {
    return new Promise((resolve, reject) => {
      Project.find({}, (err, projects) => {
        if (err) return reject(err)
        return resolve(projects)
      })
    })
  },

  getOne(projectName) {
    return new Promise((resolve, reject) => {
      Project.findOne(
        {
          name: projectName
        },
        (err, result) => {
          if (err) return reject(err)
          resolve(result)
        }
      )
    })
  },

  create(toCreate) {
    return new Promise((resolve, reject) => {
      const project = {
        _id: new mongoose.Types.ObjectId(),
        ...toCreate
      }
      Project.create(project, err => {
        if (err) return reject(err)
        return resolve(project)
      })
    })
  },

  getFile(id) {
    return new Promise((resolve, reject) => {
      S3.getObject(
        {
          Bucket: process.env.BUCKET,
          Key: id
        },
        (err, result) => {
          if (err) return reject(err)
          return resolve(result.Body)
        }
      )
    })
  },

  createFile(id, file) {
    return new Promise((resolve, reject) => {
      S3.createBucket(() => {
        const params = {
          Bucket: process.env.BUCKET,
          Key: id,
          Body: file.data
        }

        S3.upload(params, (err, data) => {
          if (err) return reject(err)
          return resolve(data)
        })
      })
    })
  },

  edit(projectId, project) {
    return new Promise((resolve, reject) => {
      Project.updateOne(
        {
          _id: projectId
        },
        {
          $set: {
            name: project.name,
            description: project.description
          }
        }
      ).exec(err => {
        if (err) return reject(err)
        return resolve()
      })
    })
  },

  remove(projectId) {
    return new Promise((resolve, reject) => {
      Project.deleteOne({
        _id: projectId
      }).exec(err => {
        if (err) return reject(err)
        S3.deleteObject(
          {
            Bucket: process.env.BUCKET,
            Key: projectId
          },
          (err, data) => {
            if (err) return reject(err)
            return resolve(data)
          }
        )
      })
    })
  }
}

module.exports = PostService
