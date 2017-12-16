import * as Message from '../../../constants/messages';

export default {
  async handler(req, res) {
    res.json({
      ...Message.REQUEST_SUSSESS,
      data: req.user
    });
  }
}