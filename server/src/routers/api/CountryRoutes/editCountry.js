import * as utils from '../utils';
import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export default {
  async validate(req, res) {
    let message = '';
  
    const requiredFields = ['desc', 'code', 'names'];
    message = message || utils.requiredFieldCheck(req, requiredFields);
  
    if(message) {
      throw message;
    }
  },

  async handler(req, res) {
    const formData = req.body;
    const countryId = req.params.countryId;
    const countryDoc = await CountryController.updateById(countryId, formData);

    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: countryDoc
    });
  }
}