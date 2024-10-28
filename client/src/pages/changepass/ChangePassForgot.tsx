import './changepassforgot.css';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Toaster, toast } from 'sonner';
import { getCookie } from 'typescript-cookie';
import * as AccountService from '../../services/AccountService';

type login = {
  confirmpassword: string;
  password: string;
};

const ChangePassForgot = () => {
  const navigate = useNavigate();
  const [dataLogin, setdataLogin] = useState<login>({
    confirmpassword: '',
    password: '',
  });
  const [err, seterr] = useState<login>({
    confirmpassword: '',
    password: '',
  });
  const [emailChange, setemailChange] = useState<string | null>(null);
  useEffect(() => {
    const emailChangePass = getCookie('emailPass');
    if (emailChangePass) {
      setemailChange(emailChangePass);
    }
  }, []);

  const validate = () => {
    const { confirmpassword, password } = dataLogin;
    if (password.trim() === '') {
      seterr({ ...err, password: 'Không bỏ trống' });
      return false;
    }
    if (confirmpassword.trim() === '') {
      seterr({ ...err, confirmpassword: 'Không bỏ trống' });
      return false;
    }
    if (password.trim() != confirmpassword.trim()) {
      seterr({ ...err, confirmpassword: 'Nhập lại không đúng' });
      return false;
    }
    return true;
  };
  const handleDataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    seterr({
      confirmpassword: '',
      password: '',
    });
    const { value, name } = e.target;
    setdataLogin({ ...dataLogin, [name]: value });
  };
  const handleChangePass = async () => {
    if (validate()) {
      if (emailChange) {
        console.log(dataLogin.password, emailChange);
        const change = await AccountService.changeForgotPassword({
          email: emailChange,
          password: dataLogin.password,
        });
        if (change.success == true) {
          toast.success('Đổi mật khẩu thành công');
          setTimeout(() => {
            navigate('/login');
          }, 1500);
          return;
        }
        toast.success(change.mgs);
        return;
      }
      toast.error('Hết thời gian đổi mật khẩu');
    }
  };
  return (
    <section className="login">
      <Toaster position="top-center" expand={false} richColors />
      <div className="login_mark row">
        <div className="col-md-6 login_mark_col">
          <h1 className="login_form_title_logo login_form_title">
            Change <span className="vip">password</span>
          </h1>
          <div className="login_form row mt-2">
            <span className="vip" style={{ textAlign: 'center' }}>
              Change password user
            </span>

            {/*  */}
            <FloatingLabel
              controlId="floatingPassword"
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
              <span className="text-danger p-0" style={{ fontSize: '.9rem' }}>
                {err.password != '' && err.password}
              </span>
            </FloatingLabel>

            {/*  */}
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm password"
              className="mt-4 px-1"
              style={{ color: 'gray' }}
            >
              <Form.Control
                type="password"
                name="confirmpassword"
                value={dataLogin.confirmpassword}
                onChange={handleDataLogin}
                placeholder="pass"
                className="focus-ring
                focus-ring-danger"
              />
            </FloatingLabel>

            <span className="text-danger p-0" style={{ fontSize: '.9rem' }}>
              {err.confirmpassword != '' && err.confirmpassword}
            </span>
            {/*  */}
            <div className="mt-2 p-0" style={{ textAlign: 'center' }}>
              <button onClick={handleChangePass} className="login_btn mt-4">
                Change
              </button>
            </div>
          </div>
          <Form.Label className="mt-4">
            Quay lại?{' '}
            <Link className="vip viphv" to={'/login'}>
              Đăng nhập
            </Link>
          </Form.Label>
        </div>
        <div className="col-md-6"></div>
      </div>
    </section>
  );
};
export default ChangePassForgot;
