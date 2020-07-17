const PostService = require('../services/PostService')

module.exports = (app) => {
  app.get('/blog/post/:url', (req, res) => {
    PostService.getOne(req.params.url)
      .then((post) => {
        return res.status(200).json(post)
      })
      .catch((e) => {
        return res.status(500).json(e)
      })
  })

  app.get('/blog/post/', (req, res) => {
    PostService.getAll()
      .then((posts) => {
        return res.status(200).json(posts)
      })
      .catch((e) => {
        return res.status(500).json(e)
      })
  })

  app.post('/blog/post/', (req, res) => {
    PostService.create(req.body)
      .then(() => {
        return res.sendStatus(201)
      })
      .catch((e) => {
        return res.status(500).json(e)
      })
  })

  app.delete('/blog/post/:id', (req, res) => {
    PostService.remove(req.params.id)
      .then((posts) => {
        return res.sendStatus(202)
      })
      .catch((e) => {
        return res.status(500).json(e)
      })
  })
}
