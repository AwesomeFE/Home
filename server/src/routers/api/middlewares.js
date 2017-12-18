import { User } from '../../models';
import * as Message from '../../constants/messages';

export async function GetLoginUser (req, res, next) {
  const { userId } = req.session;

  req.user = userId ? await User.findById(userId) : null;

  next();
}

export function EnsureLogin(req, res, next) {
  const { userId } = req.session;
  
  if(!userId) {
    next(Message.SHOULD_LOGIN);
  }
  next();
}

export function AuthCheck(req, res, next) {
  next();
}