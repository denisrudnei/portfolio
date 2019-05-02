const mongoose = require('mongoose')
const Project = require('../models/Project')
const S3 = require('../../plugins/S3')

module.exports = app => {
  app.get('/project', (req, res) => {
    Project.find({}, (err, posts) => {
      if (err) return res.status(500).json(err)
      return res.status(200).json(posts)
    })
  })

  app.get('/project/:name', (req, res) => {
    Project.findOne(
      {
        name: req.params.name
      },
      (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
      }
    )
  })

  app.post('/project', (req, res) => {
    const project = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    }
    Project.create(project, err => {
      if (err) return res.status(500).json(err)
      return res.status(201).json(project)
    })
  })

  app.get('/project/:id/file', (req, res) => {
    S3.getObject(
      {
        Bucket: process.env.BUCKET,
        Key: req.params.id
      },
      (err, result) => {
        if (err) return res.redirect('/project.jpg')
        return res.end(result.Body)
      }
    )
  })

  app.post('/project/:id/file', (req, res) => {
    S3.createBucket(() => {
      const params = {
        Bucket: process.env.BUCKET,
        Key: req.params.id,
        Body: req.files.file.data
      }

      S3.upload(params, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.sendStatus(200)
      })
    })
  })

  app.put('/project/:id', (req, res) => {
    Project.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        $set: {
          name: req.body.name,
          description: req.body.description
        }
      }
    ).exec(err => {
      if (err) return res.status(500).json(err)
      return res.sendStatus(201)
    })
  })

  app.delete('/project/:id', (req, res) => {
    const id = req.params.id
    Project.deleteOne({
      _id: id
    }).exec(err => {
      if (err) return res.status(500).json(err)
      S3.deleteObject(
        {
          Bucket: process.env.BUCKET,
          Key: id
        },
        (err, data) => {
          if (err) return res.status(500).json(err)
          return res.sendStatus(200)
        }
      )
    })
  })
}
