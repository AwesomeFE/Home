import * as utils from '../utils';
import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export default {
  async validate(req, res) {
    let message = '';
  
    const requiredFields = ['desc', 'code'];
    message = message || utils.requiredFieldCheck(req, requiredFields);
  
    if(message) {
      throw message;
    }
  },

  async handler(req, res) {

  }
}