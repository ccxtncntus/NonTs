import './register.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Toaster, toast } from 'sonner';
import * as AccountService from '../../services/AccountService';
type login = {
  email: string;
  password: string;
  name: string;
  confirmPass: string;
};

const Register = () => {
  const [dataLogin, setdataLogin] = useState<login>({
    email: '',
    password: '',
    name: '',
    confirmPass: '',
  });
  const [err, seterr] = useState<login>({
    email: '',
    password: '',
    name: '',
    confirmPass: '',
  });

  const validate = () => {
    const { email, password, name, confirmPass } = dataLogin;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      seterr({ ...err, email: 'Không bỏ trống' });
      return false;
    }
    if (!emailRegex.test(email)) {
      seterr({ ...err, email: 'Email không hợp lệ' });
      return false;
    }
    if (name.trim() === '') {
      seterr({ ...err, name: 'Không bỏ trống' });
      return false;
    }
    if (password.trim() === '') {
      seterr({ ...err, password: 'Không bỏ trống' });
      return false;
    }
    if (confirmPass.trim() === '') {
      seterr({ ...err, confirmPass: 'Không bỏ trống' });
      return false;
    }
    if (confirmPass.trim() != password.trim()) {
      seterr({ ...err, confirmPass: 'Nhập lại không đúng' });
      return false;
    }
    return true;
  };
  const handleDataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterr({
      email: '',
      password: '',
      name: '',
      confirmPass: '',
    });
    const { value, name } = e.target;
    setdataLogin({ ...dataLogin, [name]: value });
  };
  const handleRegister = async () => {
    if (validate()) {
      const { name, email, password } = dataLogin;
      const register = await AccountService.register({
        name,
        email,
        password,
      });
      console.log(register);
      if (register.success) {
        toast.success('Đăng kí thành công');
        setdataLogin({
          email: '',
          password: '',
          name: '',
          confirmPass: '',
        });
        return;
      }
      toast.error(register.mgs);
    }
  };
  return (
    <section className="register">
      <Toaster richColors position="top-center" />
      <div className="register_mark row">
        <div className="col-md-6">
          <img src="" alt="" />
        </div>
        <div className="col-md-6 register_mark_col">
          <h1 className="register_form_title_logo register_form_title">
            Create <span className="vip">account</span>
          </h1>
          <div className="register_form row mt-2">
            <span className="vip" style={{ textAlign: 'center' }}>
              User register
            </span>
            {/* email */}
            <FloatingLabel
              controlId="floatingInput1"
              label="Email"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                type="email"
                name="email"
                value={dataLogin.email}
                onChange={handleDataLogin}
                placeholder="name@example.com"
                className="focus-ring
                focus-ring-danger"
              />
            </FloatingLabel>
            <span
              className="text-danger mt-1 px-1"
              style={{ fontSize: '.9rem' }}
            >
              {err.email != '' && err.email}
            </span>
            {/* name */}
            <FloatingLabel
              controlId="floatingPassword2"
              label="Name"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                name="name"
                value={dataLogin.name}
                onChange={handleDataLogin}
                type="text"
                placeholder="Password"
                className="focus-ring
                focus-ring-danger"
              />
              <span className="text-danger" style={{ fontSize: '.9rem' }}>
                {err.name != '' && err.name}
              </span>
            </FloatingLabel>
            {/* password */}
            <FloatingLabel
              controlId="floatingPassword3"
              label="Password"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                name="password"
                value={dataLogin.password}
                onChange={handleDataLogin}
                type="password"
                placeholder="Password"
                className="focus-ring
                focus-ring-danger"
              />
              <span className="text-danger" style={{ fontSize: '.9rem' }}>
                {err.password != '' && err.password}
              </span>
            </FloatingLabel>

            {/* confirm */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Confirm password"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                name="confirmPass"
                value={dataLogin.confirmPass}
                onChange={handleDataLogin}
                type="password"
                placeholder="Password"
                className="focus-ring
                focus-ring-danger"
              />
              <span className="text-danger " style={{ fontSize: '.9rem' }}>
                {err.confirmPass != '' && err.confirmPass}
              </span>
            </FloatingLabel>
            {/* btn */}
            <div className="mt-2 p-0" style={{ textAlign: 'center' }}>
              <button onClick={handleRegister} className="register_btn mt-4">
                Register
              </button>
            </div>
          </div>
          <Form.Label className="mt-4">
            Đã có tài khoản?{' '}
            <Link className="vip viphv" to={'/login'}>
              Đăng nhập
            </Link>
          </Form.Label>
        </div>
      </div>
    </section>
  );
};

export default Register;
