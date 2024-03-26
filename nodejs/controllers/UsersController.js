import UserModal from '../models/UserModal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const salt = bcrypt.genSaltSync(10);
import registerValidator from '../validations/auth.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = registerValidator(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, salt);
    const checkMail = await UserModal.find({
      email: email,
    }).exec();
    if (checkMail.length > 0) {
      console.log(checkMail);
      return res.status(200).json({
        mgs: 'Email đã tồn tại',
      });
    }
    const user = new UserModal({
      name,
      email,
      password: hash,
      role: 'user',
      // image: req.file.filename,
    });
    const u = await user.save();
    return res.status(200).json({
      success: true,
      mgs: 'Đăng kí thành công',
    });
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      mgs: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkMailExists = await UserModal.findOne({
      email: email,
    });
    if (!checkMailExists) {
      return res.status(200).json({
        mgs: 'Sai mail hoặc mật khẩu...',
      });
    }
    const checkPass = bcrypt.compareSync(password, checkMailExists.password);
    if (!checkPass) {
      return res.status(200).json({
        mgs: 'Sai mail hoặc mật khẩu...',
      });
    }
    // jwt
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '7d',
    });
    await UserModal.updateOne(
      {
        email: email,
      },
      { curentToken: accessToken },
      { upsert: true }
    );
    return res.status(200).json({
      mgs: 'Đăng nhập thành công',
      token: accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mgs: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await UserModal.find({});
    return res.status(200).json({
      allUser: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      mgs: error.message,
    });
  }
};

export { register, login, getUsers };
