import { Router } from 'express';
import apiRouter from './api';
import webRouter from './web';
import { DEFAULT_SESSION } from '../constants';

const router = Router();

router.use(setDefaultSession);
router.use(/^\/api/, apiRouter);
router.use(/^(?!\/api\/[\s\S]+)/, webRouter);

/**
 * Set default session for any client.
 * 
 * @description If user view website at first time or website session change,
 * we will clean all the session of user use, and set the new session for user.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function setDefaultSession (req, res, next) {
  if(req.session.version !== DEFAULT_SESSION.version) {
    const defaultSession = Object.entries(DEFAULT_SESSION);
    const cookieArray = Object.entries(req.session);

    for(const [key, value] of cookieArray) {
      if(key !== 'cookie') {
        delete req.session[key];
      }
    }

    for(const [key, value] of defaultSession) {
      req.session[key] = value;
    }
  }
  
  next();
}

export default router;