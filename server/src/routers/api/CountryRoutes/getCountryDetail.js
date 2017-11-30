import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export async function auth(req, res) {

}

export async function validate(req, res) {
  
}

export async function handler(req, res) {
  const { countryId } = req.params;
  
  res.json({
    ...Messages.REQUEST_SUSSESS,
    data: await CountryController.find({_id: countryId})
  });
}