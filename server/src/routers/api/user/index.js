import multer from 'multer';
import { Router } from 'express';
// import login from './login';
import sessionUser from './sessionUser';

const router = Router();
const upload = multer({dest: 'uploads/users/'});

// router.post('/login', login);
// router.get('/user/logout', validator.logout, handler.logout);
// router.post('/user/register', validator.register, handler.register);
router.get('/session', sessionUser);

// router.post('/user/friend/:userId', handler.makeFriend);
// router.get('/user/friend/:userId', handler.checkFriendStatus);
// router.delete('/user/friend/:userId', handler.deleteFriend);

// router.get('/user/:userId', handler.getUserDetailById);
// router.put('/user/', upload.single('avatar'), handler.updateUser);
// router.post('/user/search', handler.searchUser);

export default router;
