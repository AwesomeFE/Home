import * as utils from './utils';
import validate from './validate';
import UserController from '../../../../controllers/User';
import EntryLogController from '../../../../controllers/EntryLog';

async function register(req, res, next) {
  try {
    validate(req);

    const ip = req.ip;
    const formData = req.body;

    const user = await UserController.register(formData);
    const entryLog = await EntryLogController.create({
      ip,
      userId: user._id,
      loginBy: utils.getRegisterType(formData)
    });

    utils.cleanSession(req);
    utils.setSession(req, user._id);

    res.json({
      ...ResponseService.ACCOUNT_LOGIN_SUCCESS,
      data: user
    });
  } catch(message) {
    next(message);
  }
}

export default register;