import { useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [ShowMenuUser, setShowMenuUser] = useState<boolean>(false);
  const [ProDuctsMenu, setProDuctsMenu] = useState<boolean>(false);
  const handleShowMenuUser = (): void => {
    setShowMenuUser((pre) => !pre);
  };
  return (
    <div className={"header sticky container"}>
      <div className="header_logo hover">
        <img
          src="https://i.pinimg.com/564x/6e/6f/7e/6e6f7ed284a21a77bc1f59bf739ead91.jpg"
          alt=""
        />
      </div>
      <div className="header_menu">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <span className="header_menu_show_nemu">
              <NavLink to={"/products"}>
                Sản phẩm
                {/* <i className="fa-solid fa-angle-up"></i> */}
              </NavLink>
              <i
                onClick={() => setProDuctsMenu((pre) => !pre)}
                className={
                  ProDuctsMenu
                    ? "fa-solid fa-angle-up hover"
                    : "fa-solid fa-angle-down hover"
                }
              ></i>
            </span>
          </li>
          <li>
            <NavLink to={"/contact"}>Liên hệ</NavLink>
          </li>
          <li>
            <NavLink to={"/blogs"}>Blog</NavLink>
          </li>
          <li>
            <NavLink to={"/cv/home"}>Cv</NavLink>
          </li>
          <li>
            <NavLink to={"/non"}>Non</NavLink>
          </li>
          <li>
            <NavLink to={"/tv"}>Tv</NavLink>
          </li>
        </ul>
        <div
          className={
            ProDuctsMenu ? "header_menu_products" : "header_menu_products hide"
          }
        >
          1
        </div>
      </div>
      <div className="header_icon">
        <i className="fa-regular fa-bell hover"></i>
        <i className="fa-solid fa-magnifying-glass hover"></i>
        <i className="fa-solid fa-cart-shopping hover"></i>
        <div className="header_icon_av hover">
          <img
            onClick={handleShowMenuUser}
            src="https://i.pinimg.com/564x/d5/19/9c/d5199cea4ff53c89208c605f23a8071d.jpg"
            alt=""
          />
          <ul
            className={
              ShowMenuUser ? "header_icon_menu" : "header_icon_menu hide"
            }
          >
            <li>
              Trang cá nhân <i className="fa-solid fa-house-user"></i>
            </li>
            <li>
              Đăng Nhập <i className="fa-solid fa-right-to-bracket"></i>
            </li>
            <li>
              Đăng Xuất <i className="fa-solid fa-right-from-bracket"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
