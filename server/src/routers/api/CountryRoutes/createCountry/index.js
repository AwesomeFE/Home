import * as utils from './utils';
import validate from './validate';

import * as Messages from '../../../../constants/messages';
import * as CountryController from '../../../../controllers/Country';

async function createCountry(req, res, next) {
  try {
    validate(req);
    
  } catch(message) {
    next(message);
  }
}

export default createCountry;