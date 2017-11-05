import * as Messages from '../../../../constants/messages';
import * as CountryController from '../../../../controllers/Country';

async function getAllCountries(req, res, next) {
  try {
    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: await CountryController.find()
    });
  } catch(message) {
    next(message);
  }
}

export default getAllCountries;