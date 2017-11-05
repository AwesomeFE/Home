import * as utils from './utils';
import validate from './validate';

import * as Messages from '../../../../constants/messages';
import UserController from '../../../../controllers/User';

async function sessionUser(req, res, next) {
  try {
    validate(req);

    const { userId } = req.session;
    const user = userId ? await UserController.findById(userId) : null;

    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: user
    });
  } catch(message) {
    next(message);
  }
}

export default sessionUser;
