const { SitemapStream, streamToPromise } = require('sitemap')
const sitemapGen = require('../services/SitemapService')
module.exports = app => {
  app.get('/sitemap.xml', (req, res) => {
    res.set('Content-type', 'application/xml')
    const sitemap = new SitemapStream({
      hostname: `${req.protocol}://${req.host}`
    })
    sitemapGen().then(response => {
      response.forEach(item => {
        sitemap.write({
          url: `${req.host}${item.url}`,
          changefreq: item.changefreq,
          priority: item.priority
        })
      })
      sitemap.end()
      streamToPromise(sitemap).then(response => {
        res.send(response)
      })
    })
  })
}
