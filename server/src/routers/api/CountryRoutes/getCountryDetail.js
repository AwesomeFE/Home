import * as Messages from '../../../constants/messages';
import * as CountryController from '../../../controllers/Country';

export default {
  async validate(req, res) {
    
  },

  async handler(req, res) {
    const { countryId } = req.params;
    
    res.json({
      ...Messages.REQUEST_SUSSESS,
      data: await CountryController.find({_id: countryId})
    });
  }
}