import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import ProjectService from '../services/ProjectService';

export default (app: Router) => {
  app.get('/project', (req, res) => {
    ProjectService.getAll()
      .then((projects) => res.status(200).json(projects))
      .catch((e) => res.status(500).json(e.message));
  });

  app.get('/project/file/:id/:name', (req, res) => {
    const key = `${req.params.id}/${req.params.name}`;
    ProjectService.getFile(key)
      .then((data) => {
        res.set('Content-Type', 'image/*');
        res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');
        return res.end(data);
      })
      .catch(() => res.redirect('/project.jpg'));
  });

  app.get('/project/:name', (req, res) => {
    ProjectService.getOne(req.params.name)
      .then((project) => res.status(200).json(project))
      .catch((e) => res.status(500).json(e.message));
  });

  app.post('/project', (req, res) => {
    ProjectService.create(req.body)
      .then((project) => res.status(201).json(project))
      .catch((e) => res.status(500).json(e.message));
  });

  app.post('/project/:id/file', (req, res) => {
    ProjectService.createFile(parseInt(req.params.id, 10), req.files!.file as UploadedFile)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  app.put('/project/:id', (req, res) => {
    ProjectService.edit(parseInt(req.params.id, 10), req.body)
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(500));
  });

  app.delete('/project/:id', (req, res) => {
    ProjectService.remove(parseInt(req.params.id, 10))
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(500));
  });
};
