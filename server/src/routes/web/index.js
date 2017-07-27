import path from 'path'
import express from 'express'
import UA from 'ua-parser-js'

const router = express.Router()

router.get('/admin/*', adminHandler)
router.get('/*', userHandler)

function userHandler(req, res, next) {
  const ua = new UA(req.headers['user-agent'])

  res.set({
    'ETag': Date.now()
  });

  if(ua.getDevice().type === 'mobile') {
    res.sendFile(path.join(__dirname, '../../../../client/dist/mobile/index.html'))
  } else {
    res.sendFile(path.join(__dirname, '../../../../client/dist/client/index.html'))
  }
}

function adminHandler(req, res, next) {
  res.sendFile(path.join(__dirname, '../../../../client/dist/dashboard.html'))
}

export default router
