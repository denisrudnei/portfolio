import express from 'express';
import { Session, SessionData } from 'express-session';
import User from '../models/User';

type Content = {
  authUser?: User
}

declare module 'express' {
  export interface Request {
    session: Session & Partial<SessionData> & Content
  }
}

export interface CustomExpressContext {
  req: express.Request & Request
  res: express.Response
}
