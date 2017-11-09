import multer from 'multer';
import { Router } from 'express';
import signin from './signin';
import sessionUser from './sessionUser';

const router = Router();
const upload = multer({dest: 'uploads/users/'});

router.post('/signin', signin);
// router.post('/signup', signup);
// router.get('/logout', logout);
router.get('/session', sessionUser);

// router.post('/user/friend/:userId', handler.makeFriend);
// router.get('/user/friend/:userId', handler.checkFriendStatus);
// router.delete('/user/friend/:userId', handler.deleteFriend);

// router.get('/user/:userId', handler.getUserDetailById);
// router.put('/user/', upload.single('avatar'), handler.updateUser);
// router.post('/user/search', handler.searchUser);

export default router;
