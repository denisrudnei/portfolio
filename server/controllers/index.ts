import { Router } from 'express';
import AuthController from './AuthController';
import ProjectController from './ProjectController';
import UserController from './UserController';
import PostController from './PostController';
import StackOverFlowController from './StackOverflowController';
import SitemapController from './SitemapController';

export default (apiRouter: Router) => {
  AuthController(apiRouter);
  ProjectController(apiRouter);
  UserController(apiRouter);
  PostController(apiRouter);
  StackOverFlowController(apiRouter);
  SitemapController(apiRouter);
};
