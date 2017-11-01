import { Router } from 'express';
import UserRouter from './user';
import CaptchaRouter from './captcha';
import { setLoginUser } from '../middleware';

const router = Router();

router.use(setLoginUser);
// router.use(require('./sms'));
router.use('/user', UserRouter);
// router.use(require('./blog'));
// router.use(require('./file'));
router.use('/captcha', CaptchaRouter);

export default router;
