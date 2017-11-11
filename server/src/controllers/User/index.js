import { User } from '../../models';
import * as helper from './helper';
import { projectionTypes } from '../../constants';
import * as Messages from '../../constants/messages';

export async function findById(userId) {
  const userDoc = await User.findById(userId);

  return helper.formatUserJson(userDoc, projectionTypes.SELF);
}

export async function login(formData) {
  // encrypt user password
  const password = helper.encryptPassword(formData.password);
  delete formData.password;

  // get user
  const userDoc = await User.findOne(formData);

  if (!userDoc) {
    throw Messages.USER_NOT_FOUND;
  }

  if (password !== userDoc.password) {
    throw Messages.PASSWORD_ERROR;
  }

  return helper.formatUserJson(userDoc, projectionTypes.SELF);
}