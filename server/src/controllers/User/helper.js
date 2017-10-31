export function encryptPassword(password) {
  return password
    ? crypto.createHmac('md5', process.env.SERVER_PASSWORD_SECRET)
      .update(password)
      .digest('base64')
    : undefined;
}

export function formatUserJson(userDoc, projectionType) {
  const currentProjection = userDoc.projections.find(projection => projection.type === projectionType);
  const projectionArray = currentProjection.projection.split(/\s*-/g);
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;

  for(const projection of projectionArray) {
    delete user[projection];
  }

  return user;
}