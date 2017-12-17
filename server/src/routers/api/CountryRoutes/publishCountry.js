import * as utils from '../utils';
import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export default {
  async validate(req, res) {
  },

  async handler(req, res) {
    const { countryId } = req.params;
    const country = await CountryController.publishById(countryId);

    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: country
    });
  }
}