import {
  DEFAULT_SESSION,
} from '../../constants'
import { User } from '../../models/'

/**
 * 检查session是否需要重置
 * @param req
 * @param res
 * @param next
 */
export function setDefaultSession (req, res, next) {
  // 如果新来的request没有session version不正确
  if(req.session.version !== DEFAULT_SESSION.version) {
    const defaultSession = Object.entries(DEFAULT_SESSION)

    // 清空所有非cookie的session数据
    Object.keys(req.session)
      .filter(key => key !== 'cookie')
      .forEach(key => delete req.session[key])

    // 把session所有值重置成默认session
    for(const [key, value] of defaultSession) {
      req.session[key] = value
    }
  }
  // 继续路由
  next()
}

export async function setLoginUser (req, res, next) {
  if(req.session.sessionUserId) {
    req.user = await User.findById(req.session.sessionUserId)
  }

  next()
}