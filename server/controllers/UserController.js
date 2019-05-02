const User = require('../models/User')
const S3 = require('../../plugins/S3')

module.exports = app => {
  app.get('/about', (req, res) => {
    User.find()
      .select({
        email: 0,
        password: 0
      })
      .exec((err, users) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(users[0])
      })
  })

  app.post('/about/file', (req, res) => {
    User.findOne({}).exec((err, user) => {
      if (err) return res.status(500).json(err)
      const params = {
        Bucket: process.env.BUCKET,
        Key: user._id.toString(),
        Body: req.files.file.data
      }
      S3.createBucket(() => {
        S3.upload(params, err => {
          if (err) return res.status(500).json(err)
          return res.sendStatus(201)
        })
      })
    })
  })

  app.put('/about', (req, res) => {
    User.findOneAndUpdate({}, req.body).exec(err => {
      if (err) return res.status(500).json(err)
      return res.sendStatus(201)
    })
  })

  app.get('/about/image', (req, res) => {
    User.find().exec((err, users) => {
      if (err || users.length <= 0) return res.redirect('/user.svg')
      const id = users[0]._id
      S3.getObject(
        {
          Bucket: process.env.BUCKET,
          Key: id.toString()
        },
        (err, data) => {
          if (err) return res.redirect('/user.svg')
          return res.end(data.Body)
        }
      )
    })
  })
}
