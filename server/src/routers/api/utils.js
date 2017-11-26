import * as Messages from '../../constants/messages';

export function requiredFieldCheck(req, fieldNameList = []) {
  for(var name of fieldNameList) {
    if(!req.body[name]) {
      return {
        ...Messages.FIELD_IS_EMPYT,
        messages: `${name} is required.`
      };
    }
  }
}

export function authCheck(req) {
  console.log(req)
}