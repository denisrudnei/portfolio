import { Router } from 'express';

import AuthController from './AuthController';
import ProjectController from './ProjectController';
import SitemapController from './SitemapController';
import StackOverFlowController from './StackOverflowController';
import UserController from './UserController';

const router = Router();

router.use(AuthController);
router.use(ProjectController);
router.use(UserController);
router.use(StackOverFlowController);
router.use(SitemapController);

export default router;
