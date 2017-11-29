import { Router } from 'express';
import { setLoginUser } from '../middleware';
import CountryRoutes from './CountryRoutes';

const router = Router();

const middlewares = [
  setLoginUser
];

const routes = [
  { path: '/country', method: 'get', ...CountryRoutes.getAllCountries },
  { path: '/country', method: 'post', ...CountryRoutes.createCountry },
  { path: '/country/:countryId', method: 'get', ...CountryRoutes.getCountryDetail }
];

// Setting the middleware
for(const middleware of middlewares) {
  router.use(middleware);
}

// Setting the routes
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

// import SmsRouter from './sms';
// import UserRouter from './user';
// import CaptchaRouter from './captcha';

// router.use('/sms', SmsRouter);
// router.use('/user', UserRouter);
// router.use('/country', CountryRouter);
// router.use(require('./blog'));
// router.use(require('./file'));
// router.use('/captcha', CaptchaRouter);

export default router;
