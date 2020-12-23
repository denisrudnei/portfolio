import express, { Router } from 'express';
import jwt from 'jsonwebtoken';

import AuthService from '../services/AuthService';

const router = Router();

router.post('/auth/login', (req: express.Request, res: express.Response) => {
  AuthService.login(req.body.email, req.body.password, req)
    .then((user) => {
        req.session!.authUser = user;
        const token = jwt.sign({
          id: user.id,
          email: user.email,
          name: user.name,
        }, process.env.JWT_KEY!);
        return res.status(201).json({
          user: token,
        });
    })
    .catch((e) => res.status(400).json(e.message));
});

router.post('/auth/user', (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt.decode(token);
    res.json({
      user,
    });
  }
});

router.post('/auth/logout', (req: express.Request, res: express.Response) => {
  delete req.session!.authUser;
  return res.sendStatus(201);
});

router.post('/auth/register', (req, res) => {
  AuthService.create(req.body)
    .then(() => res.sendStatus(201))
    .catch((e) => res.status(400).json(e.message));
});

export default router;
