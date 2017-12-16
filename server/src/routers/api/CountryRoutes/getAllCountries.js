import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export default {
  async handler(req, res) {
    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: await CountryController.find()
    });
  }
}