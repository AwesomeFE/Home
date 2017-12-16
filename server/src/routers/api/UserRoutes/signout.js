import * as Messages from '../../../constants/messages';

export default {
  async handler(req, res, next) {
    delete req.session.userId;
    res.json(Messages.REQUEST_SUSSESS);
  }
}