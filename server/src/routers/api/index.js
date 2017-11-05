import { Router } from 'express';
import { setLoginUser } from '../middleware';

import SmsRouter from './sms';
import UserRouter from './user';
import CountryRouter from './country';
import CaptchaRouter from './captcha';

const router = Router();

router.use(setLoginUser);
router.use('/sms', SmsRouter);
router.use('/user', UserRouter);
router.use('/country', CountryRouter);
// router.use(require('./blog'));
// router.use(require('./file'));
router.use('/captcha', CaptchaRouter);

export default router;
