import { Router } from 'express';
import PostService from '../services/PostService';

export default (app: Router) => {
  app.get('/blog/post/:url', (req, res) => {
    PostService.getOne(req.params.url)
      .then((post) => res.status(200).json(post))
      .catch((e) => res.status(500).json(e.message));
  });

  app.get('/blog/post/', (req, res) => {
    PostService.getAll()
      .then((posts) => res.status(200).json(posts))
      .catch((e) => res.status(500).json(e.message));
  });

  app.post('/blog/post/', (req, res) => {
    PostService.create(req.body)
      .then(() => res.sendStatus(201))
      .catch((e) => res.status(500).json(e.message));
  });

  app.delete('/blog/post/:id', (req, res) => {
    PostService.remove(parseInt(req.params.id, 10))
      .then(() => res.sendStatus(202))
      .catch((e) => res.status(500).json(e.message));
  });
};
