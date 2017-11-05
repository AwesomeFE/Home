import { Country } from '../../models';
import * as helper from './helper';
import * as Messages from '../../constants/messages';

export function find(query) {
  return Country.find(query);
}