const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/admin/*', adminHomeHandler)
router.get('/*', userHomeHandler)

function userHomeHandler(req, res, next) {
  res.sendFile(path.join(__dirname, '../../../../client/dist/client/index.html'))
}

function adminHomeHandler(req, res, next) {
  res.sendFile(path.join(__dirname, '../../../../client/dist/dashboard.html'))
}

module.exports = router
