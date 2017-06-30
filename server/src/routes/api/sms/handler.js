import casual from 'casual'
import * as helper from './helper'
import * as SMSController from '../../../controllers/SMS'

export const sendVerifySMS = async (req, res, next) => {
  try {
    const {mobile} = req.query
    const SMSCode = casual.numerify('####')

    const response = await SMSController.sendMessage(mobile, SMSCode)
    helper.cleanVerifySmsSession(req)

    req.session.SMSCode = SMSCode
    res.status(response.status).json(response)
  } catch (error) {
    next(error)
  }
}

export const verifySMSCode = async (req, res, next) => {
  try {
    const response = await SMSController.verifyCode(req)

    req.session.isSmsVerifyPass = true
    res.json(response)
  } catch (error) {
    next(error)
  }
}