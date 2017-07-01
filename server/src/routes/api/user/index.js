import multer from 'multer'
import express from 'express'
import * as handler from './handler'

const router = express.Router()
const upload = multer({dest: 'uploads/users/'})

router.get('/session', handler.getSessionUser)
router.get('/logout', handler.logout)

router.post('/login', handler.login)
router.post('/register', handler.register)

//router.get('/:accountId', getUserById)
//router.post('/:accountId', upload.single('avatar'), editAccountById)

module.exports = router
