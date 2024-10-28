import './login.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import * as AccountService from '../../services/AccountService';
// import { toast } from 'sonner';
// import { setCookie } from 'typescript-cookie';
type login = {
  email: string;
  password: string;
};
// import { AccountContext } from '../../contexts/nonts/AccountContext';
const Login = () => {
  //   const { setAccount } = useContext(AccountContext);
  const navigate = useNavigate();
  const [dataLogin, setdataLogin] = useState<login>({
    email: '',
    password: '',
  });
  const [err, seterr] = useState<login>({
    email: '',
    password: '',
  });

  const validate = () => {
    const { email, password } = dataLogin;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      seterr({ ...err, email: 'Không bỏ trống' });
      return false;
    }
    if (!emailRegex.test(email)) {
      seterr({ ...err, email: 'Email không hợp lệ' });
      return false;
    }
    if (password.trim() === '') {
      seterr({ ...err, password: 'Không bỏ trống' });
      return false;
    }
    return true;
  };
  const handleDataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterr({
      email: '',
      password: '',
    });
    const { value, name } = e.target;
    setdataLogin({ ...dataLogin, [name]: value });
  };
  const handleLogin = async () => {
    navigate('/');
    if (validate()) {
      //   const { email, password } = dataLogin;
      //   const login = await AccountService.login({ email, password });
      //   if (login.success == true) {
      //     setCookie('tokenNonts', login.token, { expires: 7, path: '' });
      //     setAccount(login.curent);
      //     navigate('/');
      //     return;
      //   }
      //   toast.error(login.mgs);
    }
  };
  return (
    <section className='login'>
      <div className='login_mark row'>
        <div className='col-md-6 login_mark_col'>
          <h1 className='login_form_title_logo login_form_title'>
            Welcome to <span className='vip'>Nonts</span>
          </h1>
          <div className='login_form row mt-2'>
            <span
              className='vip'
              style={{ textAlign: 'center' }}
            >
              User login
            </span>
            <FloatingLabel
              controlId='floatingInput'
              label='Email'
              className='mt-4 px-1'
              style={{ color: 'gray' }}
            >
              <Form.Control
                type='email'
                name='email'
                value={dataLogin.email}
                onChange={handleDataLogin}
                placeholder='name@example.com'
                className='focus-ring
                focus-ring-danger'
              />
            </FloatingLabel>

            <span
              className='text-danger p-0'
              style={{ fontSize: '.9rem' }}
            >
              {err.email != '' && err.email}
            </span>
            <FloatingLabel
              controlId='floatingPassword'
              label='Password'
              className='mt-4 px-1'
              style={{ color: 'gray' }}
            >
              <Form.Control
                name='password'
                value={dataLogin.password}
                onChange={handleDataLogin}
                type='password'
                placeholder='Password'
                className='focus-ring
                focus-ring-danger'
              />
              <span
                className='text-danger p-0'
                style={{ fontSize: '.9rem' }}
              >
                {err.password != '' && err.password}
              </span>
            </FloatingLabel>
            <div
              className='mt-2 p-0'
              style={{ textAlign: 'center' }}
            >
              <button
                onClick={handleLogin}
                className='login_btn mt-4'
              >
                Login
              </button>
            </div>
          </div>
          <Link
            className='vip viphv mt-2'
            to={'/forgotpass'}
          >
            Quyên mật khẩu?
          </Link>
          <Form.Label className='mt-1'>
            Chưa có tài khoản?{' '}
            <Link
              className='vip viphv'
              to={'/register'}
            >
              Đăng ký
            </Link>
          </Form.Label>
        </div>
        <div className='col-md-6'></div>
      </div>
    </section>
  );
};

export default Login;
