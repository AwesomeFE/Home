const express = require('express')
const router = express.Router()

const {StaffController, FileController} = require('../../controllers')
const {ErrorService, ResponseService, StorageService} = require('../../services')

const storage = new StorageService('staff', FileController)

router.get('/login', refreshLogin)
router.get('/logout', logout)
router.get('/:staffId', getStaffById)

router.post('/login', login)
router.post('/register', storage.uploader.single('avatar'), register)
router.post('/:staffId', editStaffById)

function register(req, res, next) {
  const staffInfo = req.body

  if (!req.session.staff.isAdmin) {
    next(ErrorService.AUTHORITY_ERROR)
  } else {
    StaffController.createStaff(staffInfo)
      .then(staff => res.json(staff))
      .catch(error => next(error))
  }
}

function login(req, res, next) {
  StaffController.login(req.body)
    .then(staff => {
      req.session.staff = staff
      res.json(staff)
    })
    .catch(error => next(error))
}

function logout(req, res, next) {
  delete req.session.staff
  res.json(ResponseService.STAFF_LOGOUT_SUCCESSS)
}

function refreshLogin(req, res, next) {
  const staffId = req.session.staff ? req.session.staff._id : null
  StaffController.getStaffById(staffId, true)
    .then(staff => {
      if (!staff) {
        delete req.session.staff
      }
      res.json(staff)
    })
    .catch(error => next(error))
}

function getStaffById(req, res, next) {
  const {params, session} = req
  const isSelf = session.staff._id == params.staffId

  StaffController.getStaffById(params.staffId, isSelf)
    .then(staff => res.json(staff))
    .catch(error => next(error))
}

function editStaffById(req, res, next) {
  const {params, session} = req

  if (params.staff._id == session.staffId) {
    StaffController.editStaffById(session.staffId, req.body)
      .then(staff => res.json(staff))
      .catch(error => next(error))
  } else {
    next(ErrorService.AUTHORITY_ERROR)
  }
}

module.exports = router
