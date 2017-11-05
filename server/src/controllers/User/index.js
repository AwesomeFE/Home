import { User } from '../../models';
import * as helper from './helper';
import { projectionTypes } from '../../constants';
import * as Messages from '../../constants/messages';

export function findById(userId) {
  return User.findById(userId);
}