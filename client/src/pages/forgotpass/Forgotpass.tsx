import './forgotpass.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Toaster, toast } from 'sonner';
type login = {
  email: string;
  otp: string;
};

const Forgotpass = () => {
  const navigate = useNavigate();
  const [dataLogin, setdataLogin] = useState<login>({
    email: '',
    otp: '',
  });
  const [err, seterr] = useState<login>({
    email: '',
    otp: '',
  });

  const validate = () => {
    const { email } = dataLogin;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
      seterr({ ...err, email: 'Không bỏ trống' });
      return false;
    }
    if (!emailRegex.test(email)) {
      seterr({ ...err, email: 'Email không hợp lệ' });
      return false;
    }

    return true;
  };
  const handleDataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterr({
      email: '',
      otp: '',
    });
    const { value, name } = e.target;
    setdataLogin({ ...dataLogin, [name]: value });
  };
  const handleGetOtp = (): void => {
    if (validate()) {
      console.log(dataLogin);
      navigate('/forgotpass/change');
      toast.success('Đăng kí thành công');
      setdataLogin({
        email: '',
        otp: '',
      });
    }
  };
  return (
    // forgotpass;
    <section className="register">
      <Toaster richColors position="top-center" />
      <div className="register_mark row">
        <div className="col-md-6">
          <img src="" alt="" />
        </div>
        <div className="col-md-6 register_mark_col">
          <h1 className="register_form_title_logo register_form_title">
            Forgot <span className="vip">password</span>
          </h1>
          <div className="register_form row mt-2">
            <span className="vip" style={{ textAlign: 'center' }}>
              User forgot password
            </span>
            {/* email */}
            <FloatingLabel
              controlId="floatingInput"
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
            {/* otp */}
            <FloatingLabel
              controlId="floatingPassword"
              label="Mã xác nhận"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                // disabled
                name="otp"
                value={dataLogin.otp}
                onChange={handleDataLogin}
                type="text"
                placeholder="otp"
                className="focus-ring
                focus-ring-danger"
              />
              <span className="text-danger" style={{ fontSize: '.9rem' }}>
                {err.otp != '' && err.otp}
              </span>
            </FloatingLabel>
            {/* btn */}
            <div className="mt-2 p-0" style={{ textAlign: 'center' }}>
              <button onClick={handleGetOtp} className="register_btn mt-4">
                Get OTP
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

export default Forgotpass;
