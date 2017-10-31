import { DEFAULT_SESSION } from '../../constants';
import { User } from '../../models'

export function setDefaultSession (req, res, next) {
  if(req.session.version !== DEFAULT_SESSION.version) {
    const defaultSession = Object.entries(DEFAULT_SESSION);
    const cookieArray = Object.entries(req.session);

    for(const [key, value] of cookieArray) {
      if(key !== 'cookie') {
        delete req.session[key];
      }
    }

    for(const [key, value] of defaultSession) {
      req.session[key] = value;
    }
  }
  
  next();
}

export async function setLoginUser (req, res, next) {
  const { userId } = req.session;

  if(userId) {
    req.user = await User.findById(userId);
  }

  next();
}