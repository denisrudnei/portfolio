import { Router } from 'express';
import AuthController from './AuthController';
import ProjectController from './ProjectController';
import UserController from './UserController';
import StackOverFlowController from './StackOverflowController';
import SitemapController from './SitemapController';

const router = Router();

router.use(AuthController);
router.use(ProjectController);
router.use(UserController);
router.use(StackOverFlowController);
router.use(SitemapController);

export default router;
