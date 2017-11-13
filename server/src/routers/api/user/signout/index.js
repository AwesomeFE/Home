import * as Messages from '../../../../constants/messages';

async function signout(req, res, next) {
  try {
    delete req.session.userId;
    res.json(Messages.REQUEST_SUSSESS);
  } catch(message) {
    next(message);
  }
}

export default signout;
