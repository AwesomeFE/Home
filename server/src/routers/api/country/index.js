import { Router } from 'express';
import createCountry from './createCountry';
import getAllCountries from './getAllCountries';
import getCountryDetail from './getCountryDetail';

const router = Router();

router.get('/', getAllCountries);
router.get('/:countryId', getCountryDetail);
router.post('/', createCountry);

export default router;