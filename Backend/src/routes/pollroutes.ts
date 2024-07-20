// src/routes/pollRoutes.ts
import { Router } from 'express';
import { getPolls,addPoll,deletePoll } from '../controllers/pollcontroller';
const router = Router();

router.post('/polls', addPoll);
router.get('/polls', getPolls);
router.delete('/polls/:id', deletePoll);

export default router;

