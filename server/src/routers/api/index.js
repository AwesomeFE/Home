import { Router } from 'express';
import routes from './routes';

const router = Router();

// Setting the routes
for(const route of routes) {
  const isMiddleware = typeof route === 'function';

  if(!isMiddleware) {
    // set Route
    router[route.method](route.path, (req, res, next) => {
      try {
        // Request Data Validator
        route.validate && route.validate(req, res, next);
        // Router Processer
        route.handler && route.handler(req, res, next);

      } catch(message) {
        // Exception Handling
        next(message);
      }
    });
  } else {
    // set Middleware
    router.use(middleware);
  }
}

export default router;
