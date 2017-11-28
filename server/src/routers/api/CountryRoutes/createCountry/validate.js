import validator from 'validator';
import { authCheck, requiredFieldCheck } from '../../utils';
import * as Messages from '../../../../constants/messages';

function validate(req) {
  const requiredFields = ['desc', 'code'];
  const authMessage = authCheck(req);
  const fieldMessage = requiredFieldCheck(req, requiredFields);
  const hasMessage = authMessage || fieldMessage;

  if(hasMessage) {
    throw hasMessage;
  }
}

export default validate;