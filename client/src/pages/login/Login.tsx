import './login.css';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
type login = {
  email: string;
  password: string;
};

const Login = () => {
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
  const handleLogin = (): void => {
    if (validate()) {
      navigate('/');
    }
  };
  return (
    <section className="login">
      <div className="login_mark">
        <span className="login_form_title_logo login_form_title">
          Welcome to Non
        </span>
        <div className="login_form row mt-2">
          <span style={{ textAlign: 'center' }} className="login_form_title">
            User login
          </span>
          <TextField
            label="Email"
            variant="standard"
            className="mt-2"
            name="email"
            value={dataLogin.email}
            onChange={handleDataLogin}
          />
          <span className="text-danger p-0" style={{ fontSize: '.9rem' }}>
            {err.email != '' && err.email}
          </span>
          <TextField
            label="Password"
            variant="standard"
            type="password"
            className="mt-4"
            name="password"
            value={dataLogin.password}
            onChange={handleDataLogin}
          />
          <span className="text-danger p-0" style={{ fontSize: '.9rem' }}>
            {err.password != '' && err.password}
          </span>
          <div className="mt-2 p-0" style={{ textAlign: 'center' }}>
            <button onClick={handleLogin} className="login_btn mt-5">
              Login
            </button>
          </div>
        </div>
        <Form.Label className="mt-4">
          Chưa có tài khoản? <NavLink to={'/register'}>Đăng ký</NavLink>
        </Form.Label>
      </div>
    </section>
  );
};

export default Login;
