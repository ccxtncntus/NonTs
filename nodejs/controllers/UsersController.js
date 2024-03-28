import UserModal from '../models/UserModal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const salt = bcrypt.genSaltSync(10);
import registerValidator from '../validations/auth.js';
import multer from 'multer';
import sendMail from '../mail/sendMail.js';

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
    if (error)
      return res.status(200).json({
        success: false,
        mgs: error.details[0].message,
      });
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, salt);
    const checkMail = await UserModal.find({
      email: email,
    }).exec();
    if (checkMail.length > 0) {
      console.log(checkMail);
      return res.status(200).json({
        success: false,
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
    return res.status(200).json({
      success: false,
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
        success: false,
        mgs: 'Sai mail hoặc mật khẩu...',
      });
    }
    const checkPass = bcrypt.compareSync(password, checkMailExists.password);
    if (!checkPass) {
      return res.status(200).json({
        success: false,
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
      success: true,
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
function random(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const checkMailExists = await UserModal.findOne({
      email: email,
    });
    if (!checkMailExists) {
      return res.status(200).json({
        success: false,
        mgs: 'Email không tồn tại',
      });
    }
    const otp = random(5).toUpperCase();
    const title = 'Mã xác nhận của bạn từ Nonts';
    await sendMail(email.trim(), title, otp);
    // save mã xác nhận
    await UserModal.findOneAndUpdate(
      {
        email: email,
      },
      {
        refreshToken: otp,
      }
    );
    return res.status(200).json({
      success: true,
      mgs: 'Gửi mail thành công',
      saveOtp: true,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      mgs: error.message,
    });
  }
};

const checkRefeshToken = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const checkMailExists = await UserModal.findOne({
      email: email,
    });
    if (!checkMailExists) {
      return res.status(200).json({
        success: false,
        mgs: 'Email không tồn tại',
      });
    }
    if (checkMailExists?.refreshToken && checkMailExists?.refreshToken == otp) {
      return res.status(200).json({
        success: true,
        mgs: 'Check token ok',
      });
    }
    return res.status(200).json({
      success: false,
      mgs: 'Lỗi token',
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      mgs: error.message,
    });
  }
};

const changeForgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        mgs: 'Không bỏ trống',
      });
    }
    const hash = bcrypt.hashSync(password, salt);
    await UserModal.findOneAndUpdate(
      {
        email: email,
      },
      {
        password: hash,
      }
    );
    return res.status(200).json({
      success: true,
      mgs: 'Đổi mật khẩu thành công',
    });
  } catch (error) {
    return res.status(200).json({
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

export {
  register,
  login,
  getUsers,
  forgotPassword,
  checkRefeshToken,
  changeForgotPassword,
};
