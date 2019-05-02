const User = require('../models/User')
const mongoose = require('mongoose')

module.exports = app => {
  app.post('/auth/login', async (req, res) => {
    const user = await User.findOne({
      username: req.body.username
    })
    user.verifyPassword(req.body.password, (err, result) => {
      if (err || !result) return res.sendStatus(400)
      req.session.authUser = user
      return res.json(user)
    })
  })

  app.post('/auth/user', (req, res) => {
    res.json({
      user: req.session.authUser
    })
  })

  app.post('/auth/logout', (req, res) => {
    delete req.session.user
    return res.sendStatus(200)
  })

  app.post('/auth/register', (req, res) => {
    const user = {
      _id: new mongoose.Types.ObjectId(),
      email: req.body.username,
      name: req.body.name,
      password: req.body.password
    }
    if (User.find({}).size() >= 1) return res.sendStatus(400)
    User.create(user, err => {
      if (err) return res.status(500).json(err)
      return res.sendStatus(201)
    })
  })
}
