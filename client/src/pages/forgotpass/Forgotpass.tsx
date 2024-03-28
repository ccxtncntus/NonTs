import './forgotpass.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'sonner';
import * as AccountService from '../../services/AccountService';
import { setCookie } from 'typescript-cookie';
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
  const [IsSendMail, setIsSendMail] = useState<boolean>(false);
  const validateMail = () => {
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
  const validateOtp = () => {
    const { otp } = dataLogin;
    if (otp.trim() === '') {
      seterr({ ...err, otp: 'Không bỏ trống otp' });
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
  const [loading, setloading] = useState<boolean>(false);
  const handleGetOtp = async () => {
    if (validateMail()) {
      const { email } = dataLogin;
      setloading(true);
      const checkMail = await AccountService.forgotpassword({ email });
      console.log(checkMail);
      if (checkMail.success == true) {
        toast.success('Kiểm tra mã xác nhận trong mail của bạn');
        setloading(false);
        setIsSendMail(true);
        return;
      }
      toast.error(checkMail.mgs);
      setloading(false);
    }
  };
  const handleCheckOtp = async () => {
    if (validateOtp()) {
      const { email, otp } = dataLogin;
      setloading(true);
      const checkOtp = await AccountService.checkRefeshToken({ email, otp });

      if (checkOtp.success == true) {
        toast.success('Đúng token r');
        navigate('/forgotpass/change');
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 5 * 60 * 1000);
        setCookie('emailPass', email, { expires: expirationTime, path: '' });
        setloading(false);
        return;
      }
      toast.error(checkOtp.mgs);
      setloading(false);
    }
  };
  return (
    // forgotpass;
    <section className="register">
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
                disabled={IsSendMail}
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
                disabled={!IsSendMail}
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
              {!IsSendMail && (
                <button
                  disabled={loading}
                  onClick={handleGetOtp}
                  className="register_btn mt-4"
                >
                  {loading ? <div className="loader"></div> : 'Get OTP'}
                </button>
              )}

              {IsSendMail && (
                <button
                  disabled={loading}
                  onClick={handleCheckOtp}
                  className="register_btn mt-4"
                >
                  {loading ? <div className="loader"></div> : 'Xác nhận'}
                </button>
              )}
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
