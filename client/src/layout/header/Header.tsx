import { useState } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import logoVip from '../../assets/logoDone.png';
const Header = () => {
  const [ShowMenuUser, setShowMenuUser] = useState<boolean>(false);
  const handleShowMenuUser = (): void => {
    setShowMenuUser((pre) => !pre);
  };
  return (
    <>
      <header className='sticky-top bg-light shadow-sm'>
        <nav className='container'>
          <div className='d-flex justify-content-between py-1 py-md-2 align-items-center'>
            <div className='header_logo'>
              <NavLink to={'/'}>
                <img
                  src={logoVip}
                  alt=''
                />
              </NavLink>
            </div>
            <div>
              <div className='header_logo2 hover'>
                <img
                  onClick={handleShowMenuUser}
                  src='https://i.pinimg.com/564x/d5/19/9c/d5199cea4ff53c89208c605f23a8071d.jpg'
                  alt=''
                />
                <ul
                  className={
                    ShowMenuUser ? 'header_icon_menu' : 'header_icon_menu hide'
                  }
                >
                  <li className='d-block'>
                    <NavLink
                      onClick={handleShowMenuUser}
                      to={'/'}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className='d-block'>
                    <NavLink
                      onClick={handleShowMenuUser}
                      to={'/tv'}
                    >
                      Free
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleShowMenuUser}
                      to={'/login'}
                    >
                      Trang cá nhân{' '}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
