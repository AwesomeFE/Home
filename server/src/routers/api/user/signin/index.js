import * as utils from './utils';
import validate from './validate';

import * as Messages from '../../../../constants/messages';
import UserController from '../../../../controllers/User';

async function signin(req, res, next) {
  try {
    validate(req);

    const ip = req.ip;
    const formData = req.body;
    const loginBy = utils.getLoginType(formData);

    const user = await UserController.login(formData);
    const entryLog = await EntryLogController.create({ ip, loginBy, userId: user._id });

    utils.cleanSession(req);
    utils.setSession(req, user._id);

    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: user
    });

  } catch(message) {
    utils.setFailedSession(req);
    next(message);
  }
}

export default signin;
