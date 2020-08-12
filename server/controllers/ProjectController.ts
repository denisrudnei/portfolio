import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';

import ProjectService from '../services/ProjectService';

const router = Router();

router.get('/project/file/:id/:name', (req, res) => {
  const key = `project/${req.params.id}/${req.params.name}`;
  ProjectService.getFile(key)
    .then((data) => {
      res.set('Content-Type', 'image/*');
      res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');
      return res.end(data);
    })
    .catch(() => res.redirect('/project.jpg'));
});

router.post('/project/:id/file', (req, res) => {
  ProjectService.createFiles(parseInt(req.params.id, 10), req.files!.files as UploadedFile[])
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(500).json(e.message));
});

export default router;
