import utils from './utils';
import validate from './validate';
import UserController from '../../../../controllers/User';

async function login(req, res, next) {
  try {
    validator(req);

    const ip = req.ip;
    const formData = req.body;

    const user = await UserController.login(formData);
    const entryLog = await EntryLogController.create({ ip });

    utils.cleanSession(req);
    utils.setSession(req, {user});

    res.json({
      ...ResponseService.ACCOUNT_LOGIN_SUCCESS,
      data: user
    });
  } catch(message) {
    utils.setFailedSession(req);
    next(message);
  }
}

export default login;