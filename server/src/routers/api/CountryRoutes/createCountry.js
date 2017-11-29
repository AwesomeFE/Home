import validator from 'validator';
import { authCheck, requiredFieldCheck } from '../../utils';
import * as Messages from '../../../../constants/messages';
import * as CountryController from '../../../../controllers/Country';

export async function auth(req, res) {

}

export async function validate(req, res) {
  const requiredFields = ['desc', 'code'];
  const authMessage = authCheck(req);
  const fieldMessage = requiredFieldCheck(req, requiredFields);
  const hasMessage = authMessage || fieldMessage;

  if(hasMessage) {
    throw hasMessage;
  }
}

export async function handler(req, res) {

}