import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import UserService from '../services/UserService';

const router = Router();

router.post('/about/file', (req, res) => {
  UserService.setProfilePicture(req.files!.file as UploadedFile)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(500).json(e.message));
});

router.get('/about/image', (req, res) => {
  UserService.getImage()
    .then((image) => res.end(image))
    .catch(() => res.redirect('/user.svg'));
});

export default router;
