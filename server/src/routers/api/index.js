import { Router } from 'express';
import { setLoginUser } from '../middleware';

import SmsRouter from './sms';
import UserRouter from './user';
import CountryRouter from './CountryRoutes';
import CaptchaRouter from './captcha';

const router = Router();

const routes = [
  { path: '/country',             method: 'get', auth: auth, validate: validate, handler: handler },
  { path: '/country',             method: 'post', auth: auth, validate: validate, handler: handler },
  { path: '/country/:countryId',  method: 'get', auth: auth, validate: validate, handler: handler }
];

for(const route of routes) {
  router[route.method](route.path, (req, res, next) => {
    try {
      // Authorization Check
      route.auth && route.auth(req, res, next);
      // Request Data Validator
      route.validate && route.validate(req, res, next);
      // Router Processer
      route.handler && route.handler(req, res, next);

    } catch(message) {
      // Exception Handling
      next(message);
    }
  });
}

router.use(setLoginUser);
router.use('/sms', SmsRouter);
router.use('/user', UserRouter);
// router.use('/country', CountryRouter);
// router.use(require('./blog'));
// router.use(require('./file'));
router.use('/captcha', CaptchaRouter);

export default router;
