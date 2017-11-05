import { Router } from 'express';
import getAllCountries from './getAllCountries';

const router = Router();

router.get('/', getAllCountries);

export default router;