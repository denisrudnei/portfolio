const { response } = require('express')
const StackOverflowService = require('../services/StackOverflowService')

module.exports = (app) => {
  app.get('/questions', (req, res) => {
    StackOverflowService.getQuestions().then((questions) => {
      res.status(200).json(questions)
    }).catch((err) => {
      res.status(500).json(err)
    })
  })

  app.get('/stackInfo', (req, res) => {
    StackOverflowService.getInfo().then((info) => {
      res.status(200).json(info)
    }).catch((err) => {
      res.status(500).json(err)
    })
  })

  app.post('/stackInfo', (req, res) => {
    StackOverflowService.create(req.body).then((stackInfo) => {
      res.status(201).json(stackInfo)
    }).catch((err) => {
      res.status(500).json(err)
    })
  })
}
