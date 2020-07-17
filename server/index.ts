const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const apiRouter = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUploader = require('express-fileupload')
const compression = require('compression')
const session = require('express-session')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    if (process.env.SECURE_HTTP_CONNECTION) {
      app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301))
    }
    await nuxt.ready()
  }

  app.use(compression())

  app.use(bodyParser.json())

  app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000
      }
    })
  )

  app.use(
    fileUploader({
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    })
  )
  require('./controllers/AuthController')(apiRouter)
  require('./controllers/ProjectController')(apiRouter)
  require('./controllers/UserController')(apiRouter)
  require('./controllers/PostController')(apiRouter)
  require('./controllers/StackOverflowController')(apiRouter)
  app.use('/api', apiRouter)
  require('./controllers/SitemapController')(app)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
