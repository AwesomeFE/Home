import { Router } from 'express';
import { setLoginUser } from '../middleware';

const router = Router();

router.use(setLoginUser);
// router.use(require('./sms'));
router.use(require('./user'));
// router.use(require('./blog'));
// router.use(require('./file'));
// router.use(require('./captcha'));

export default router;
