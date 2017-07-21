import multer from 'multer'
import express from 'express'
import * as handler from './handler'

const router = express.Router()
const upload = multer({dest: 'uploads/users/'})

router.get('/session', handler.getSessionUser)
router.get('/logout', handler.logout)
router.post('/login', handler.login)
router.post('/register', handler.register)
router.post('/:userId/friend', handler.makeFriend)
router.get('/:userId/friend', handler.checkFriendStatus)
router.delete('/:userId/friend', handler.deleteFriend)
router.get('/:userId', handler.getUserDetailById)

//router.post('/:accountId', upload.single('avatar'), editAccountById)

module.exports = router
