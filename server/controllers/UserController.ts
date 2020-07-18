import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import UserService from '../services/UserService';

export default (app: Router) => {
  app.get('/about', (req, res) => {
    UserService.get()
      .then((user) => res.status(200).json(user))
      .catch((e) => res.status(500).json(e.message));
  });

  app.post('/about/file', (req, res) => {
    UserService.setProfilePicture(req.files!.file as UploadedFile)
      .then(() => res.sendStatus(201))
      .catch((e) => res.status(500).json(e.message));
  });

  app.put('/about', (req, res) => {
    UserService.edit(req.body)
      .then(() => res.sendStatus(202))
      .catch((e) => res.status(500).json(e.message));
  });

  app.get('/about/image', (req, res) => {
    UserService.getImage()
      .then((image) => res.end(image))
      .catch(() => res.redirect('/user.svg'));
  });
};
