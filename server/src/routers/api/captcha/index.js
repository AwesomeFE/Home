import { Router } from 'express';
import generate from './generate';
import verify from './verify';

const router = Router();

router.get('/', generate);
router.post('/', verify);

export default router;