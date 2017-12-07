import * as utils from '../utils';
import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export async function validate(req, res) {
  let message = '';

  const requiredFields = ['desc', 'code'];
  message = message || utils.requiredFieldCheck(req, requiredFields);

  if(message) {
    throw message;
  }
}

export async function handler(req, res) {

}