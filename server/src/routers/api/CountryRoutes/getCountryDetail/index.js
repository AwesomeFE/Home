import * as Messages from '../../../../constants/messages';
import * as CountryController from '../../../../controllers/Country';

async function getCountryDetail(req, res, next) {
  try {
    const { countryId } = req.params;
    
    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: await CountryController.find({_id: countryId})
    });
  } catch(message) {
    next(message);
  }
}

export default getCountryDetail;