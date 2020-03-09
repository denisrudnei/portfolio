const ProjectService = require('../services/ProjectService')
module.exports = app => {
  app.get('/project', (req, res) => {
    ProjectService.getAll()
      .then(projects => {
        return res.status(200).json(projects)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.get('/project/file/:id/:name', (req, res) => {
    const key = `${req.params.id}/${req.params.name}`
    ProjectService.getFile(key)
      .then(data => {
        res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600')  
        return res.end(data)
      })
      .catch(() => {
        return res.redirect('/project.jpg')
      })
  })

  app.get('/project/:name', (req, res) => {
    ProjectService.getOne(req.params.name)
      .then(project => {
        return res.status(200).json(project)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.post('/project', (req, res) => {
    ProjectService.create(req.body)
      .then(project => {
        return res.status(201).json(project)
      })
      .catch(e => {
        return res.status(500).json(e)
      })
  })

  app.post('/project/:id/file', (req, res) => {
    ProjectService.createFile(req.params.id, req.files.file)
      .then(() => {
        return res.sendStatus(201)
      })
      .catch(e => {
        return res.sendStatus(500)
      })
  })

  app.put('/project/:id', (req, res) => {
    ProjectService.edit(req.params.id, req.body)
      .then(() => {
        return res.sendStatus(202)
      })
      .catch(e => {
        return res.sendStatus(500)
      })
  })

  app.delete('/project/:id', (req, res) => {
    ProjectService.remove(req.params.id)
      .then(() => {
        return res.sendStatus(202)
      })
      .catch(e => {
        return res.sendStatus(500)
      })
  })
}
