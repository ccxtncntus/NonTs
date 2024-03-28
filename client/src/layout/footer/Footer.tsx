import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer_home">
      <div className="footer_home_menu">
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
        </ul>
      </div>
      {/* <hr /> */}
      <div className="footer_home_me">© 2024 Company, Nonts</div>
    </div>
  );
};

export default Footer;
