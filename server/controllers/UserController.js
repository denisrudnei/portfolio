const UserService = require('../services/UserService')

module.exports = app => {
  app.get('/about', (req, res) => {
    UserService.get()
      .then(user => {
        return res.status(200).json(user)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.post('/about/file', (req, res) => {
    UserService.setProfilePicture(req.files.file)
      .then(() => {
        return res.sendStatus(201)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.put('/about', (req, res) => {
    UserService.edit(req.body)
      .then(() => {
        return res.sendStatus(202)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.get('/about/image', (req, res) => {
    UserService.getImage()
      .then(image => {
        return res.end(image)
      })
      .catch(e => {
        return res.redirect('/user.svg')
      })
  })
}
