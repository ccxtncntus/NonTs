import jwt from 'jsonwebtoken';
function authenToken(req, res, next) {
  const authorizationClient = req.headers['authorization'];
  const token = authorizationClient && authorizationClient.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.verifiedData = verified;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
}
export default authenToken;
