import { Country } from '../../models';
import * as helper from './helper';
import * as Messages from '../../constants/messages';

export function find(query) {
  return Country.find(query);
}

export function findById(id) {
  return Country.findById(id);
}

export function create(countryData) {
  const country = new Country(countryData);
  return country.save();
}