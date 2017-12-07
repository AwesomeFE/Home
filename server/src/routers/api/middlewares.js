export function AuthCheck(req, res, next) {
  next();
}

export async function GetLoginUser (req, res, next) {
  const { userId } = req.session;

  if(userId) {
    req.user = await User.findById(userId);
  }

  next();
}