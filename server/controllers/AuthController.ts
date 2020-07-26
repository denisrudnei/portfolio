import { Router } from 'express';
import AuthService from '../services/AuthService';

const router = Router();

router.post('/auth/login', (req, res) => {
  AuthService.login(req.body.email, req.body.password)
    .then((user) => {
        req.session!.authUser = user;
        return res.status(201).json(user);
    })
    .catch(() => res.sendStatus(400));
});

router.post('/auth/user', (req, res) => {
  res.json({
    user: req.session!.authUser,
  });
});

router.post('/auth/logout', (req, res) => {
  delete req.session!.user;
  return res.sendStatus(201);
});

router.post('/auth/register', (req, res) => {
  AuthService.create(req.body)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(400).json(e));
});

export default router;
