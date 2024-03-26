import UserModal from '../models/UserModal.js';
async function isAdmin(req, res, next) {
  try {
    const { email } = req.verifiedData;
    const data = await UserModal.findOne({ email: email });
    if (data.role != 'admin') {
      return res.sendStatus(401);
      //   .json({
      //     mgs: 'Bạn k đủ thẩm quyền',
      //   });
    }
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
}
export default isAdmin;
