import UserModal from "../models/UserModal.js";
// import { bcrypt } from "bcrypt";
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new UserModal({
      name,
      email,
      password,
      image: req.file.filename,
    });
    const u = await user.save();
    return res.status(200).json({
      success: true,
      mgs: "register success",
      u: u,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mgs: error.message,
    });
  }
};
export { register };
