import request from '../configs/Request';
type RegisterType = {
  name: string;
  email: string;
  password: string;
};
type LoginType = {
  email: string;
  password: string;
};
type ForgotType = {
  email: string;
};
type MailType = {
  mailRecieve: string;
  title: string;
  content: string;
};
type refeshType = {
  email: string;
  otp: string;
};
const register = async (data: RegisterType) => {
  const register = await request.post('/api/register', data);
  return register.data;
};

const login = async (data: LoginType) => {
  const register = await request.post('/api/login', data);
  return register.data;
};
const forgotpassword = async (data: ForgotType) => {
  const register = await request.post('/api/forgotpassword', data);
  return register.data;
};
const sendOtp = async (data: MailType) => {
  const register = await request.post('/api/sendMail', data);
  return register.data;
};
const checkRefeshToken = async (data: refeshType) => {
  const register = await request.post('/api/checkRefeshToken', data);
  return register.data;
};
const changeForgotPassword = async (data: LoginType) => {
  const register = await request.patch('/api/changeForgotPassword', data);
  return register.data;
};
const getUsersCurent = async (token: string) => {
  const curentUser = await request.get('/api/getUsersCurent', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (curentUser.data.success == true) {
    return curentUser.data.curent;
  }
  return curentUser.data.mgs;
};

export {
  register,
  login,
  forgotpassword,
  sendOtp,
  checkRefeshToken,
  changeForgotPassword,
  getUsersCurent,
};
