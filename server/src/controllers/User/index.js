import { User } from '../../models';
import * as helper from './helper';
import * as Messages from '../../constants/messages';

export async function login(formData) {

  const password = helper.encryptPassword(formData.password);
  delete formData.password;

  const userDoc = await User.findOne(formData);

  if (!userDoc) {
    throw Messages.USER_NOT_FOUND;
  }
  
  if (password !== userDoc.password) {
    throw Messages.PASSWORD_ERROR;
  }

  return helper.formatUserJson(userDoc);
}