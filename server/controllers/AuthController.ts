const AuthService = require('../services/AuthService')
module.exports = (app) => {
  app.post('/auth/login', (req, res) => {
    AuthService.login(req.body.username, req.body.password)
      .then((user) => {
        req.session.authUser = user
        return res.status(201).json(user)
      })
      .catch(() => {
        return res.sendStatus(400)
      })
  })

  app.post('/auth/user', (req, res) => {
    res.json({
      user: req.session.authUser
    })
  })

  app.post('/auth/logout', (req, res) => {
    delete req.session.user
    return res.sendStatus(201)
  })

  app.post('/auth/register', (req, res) => {
    AuthService.create(req.body)
      .then(() => {
        return res.sendStatus(201)
      })
      .catch((e) => {
        return res.status(400).json(e)
      })
  })
}
