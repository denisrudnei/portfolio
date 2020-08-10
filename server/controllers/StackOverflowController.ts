import { Router } from 'express';
import StackOverflowService from '../services/StackOverflowService';

const router = Router();

router.get('/questions', (req, res) => {
  StackOverflowService.getQuestions().then((questions) => {
    res.status(200).json(questions);
  }).catch((err) => {
    res.status(500).json(err.message);
  });
});

router.get('/stackInfo', (req, res) => {
  StackOverflowService.getInfo().then((info) => {
    res.status(200).json(info);
  }).catch((err) => {
    res.status(500).json(err.message);
  });
});

router.post('/stackInfo', (req, res) => {
  StackOverflowService.create(req.body).then((stackInfo) => {
    res.status(201).json(stackInfo);
  }).catch((err) => {
    res.status(500).json(err.message);
  });
});
export default router;
