import { Router } from 'express';
import apiRouter from './api';
import webRouter from './web';
import { setDefaultSession } from './middleware';

const router = Router();

router.use(setDefaultSession);
router.use(/^\/api\/[\s\S]+/, apiRouter);
// router.use(/^(?!\/api\/[\s\S]+)/, webRouter);

export default Routers;