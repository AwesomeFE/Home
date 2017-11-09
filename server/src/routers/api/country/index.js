import { Router } from 'express';
import createCountry from './createCountry';
import getAllCountries from './getAllCountries';

const router = Router();

router.get('/', getAllCountries);
router.post('/', createCountry);

export default router;