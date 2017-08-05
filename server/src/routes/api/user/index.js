import multer from 'multer'
import express from 'express'
import * as handler from './handler'

const router = express.Router()
const upload = multer({dest: 'uploads/users/'})

router.post('/login', handler.login)
router.get('/logout', handler.logout)
router.post('/register', handler.register)
router.get('/session', handler.getSessionUser)

router.post('/friend/:userId', handler.makeFriend)
router.get('/friend/:userId', handler.checkFriendStatus)
router.delete('/friend/:userId', handler.deleteFriend)

router.get('/:userId', handler.getUserDetailById)
router.put('/', upload.single('avatar'), handler.updateUser)
router.post('/search', handler.searchUser)

module.exports = router
