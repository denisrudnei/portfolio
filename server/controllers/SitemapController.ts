import { SitemapStream, streamToPromise } from 'sitemap';
import { Router } from 'express';
import sitemapGen from '../services/SitemapService';

const router = Router();

router.get('/sitemap.xml', (req, res) => {
  res.set('Content-type', 'application/xml');
  const sitemap = new SitemapStream({
    hostname: `${req.protocol}://${req.hostname}`,
  });
  sitemapGen().then((response) => {
    response.forEach((item) => {
      sitemap.write(item);
    });
    sitemap.end();
    streamToPromise(sitemap).then((result) => {
      res.send(result);
    });
  });
});

export default router;
