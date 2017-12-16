import * as Messages from '../../../constants/messages';
import * as UserController from '../../../controllers/User';
import * as EntryLogController from '../../../controllers/EntryLog';
const { LOGIN_FAILED_EXPIRE, LOGIN_FAILED_TIMES } = process.env;

export default {

  async validate(req, res) {
    const { username, mobile, email, password, captcha } = req.body;
    const isPassportEmpty = !(username || mobile || email);
    const isPasswordEmpty = !password;
  
    if(isPassportEmpty) {
      throw Messages.UNKNOW_LOGIN_TYPE;
    }
    if(isPasswordEmpty) {
      throw Messages.PASSWORD_EMPTY;
    }
  
    const {
      userId: sUserId,
      captcha: sCaptcha,
      loginFailedAt: sLoginFailedAt,
      loginFailedTimes: sLoginFailedTimes
    } = req.session;
  
    if(sUserId) {
      throw Messages.IS_ALREADY_LOGIN;
    }
  
    if(Date.now() - sLoginFailedAt < LOGIN_FAILED_EXPIRE && sLoginFailedTimes >= LOGIN_FAILED_TIMES) {
      if(!sCaptcha || sCaptcha.toUpperCase() !== captcha.toUpperCase()) {
        throw Messages.CAPTCHA_VERIFY_FAILED;
      }
    }
  
    delete req.body.captcha;
  },

  async handler(req, res) {
    try {
      const ip = req.ip;
      const formData = req.body;
      const loginBy = getLoginType(formData);
    
      const user = await UserController.login(formData);
      const entryLog = await EntryLogController.create({ ip, loginBy, userId: user._id });
    
      formatSession(req, { userId: user._id });
    
      res.json({
        ...Messages.REQUEST_SUSSESS,
        data: user
      });
  
      req.session.loginFailedTimes += 1;
      req.session.loginFailedAt = Date.now();
    } catch (error) {
      setFailedSession(req);
      throw error;
    }
  }
}

function getLoginType(formData) {
  return Object.keys(formData)[0];
}

function formatSession(req, options) {
  req.session.smsCode = '';
  req.session.captcha = '';
  req.session.loginFailedAt = 0;
  req.session.loginFailedTimes = 0;
  req.session.isSmsVerifyPass = false;
  req.session.isCaptchaVerifyPass = false;

  req.session.userId = options.userId;
}

function setFailedSession (req) {
  req.session.loginFailedTimes += 1;
  req.session.loginFailedAt = Date.now();
}