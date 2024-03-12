import "./cv.css";
import imgBg from "../../assets/home-bg.jpg";
import { NavLink, Outlet } from "react-router-dom";
import Nav from "../../components/cv/Nav";
import Footer from "../../components/cv/Footer";
const Cv = () => {
  return (
    <div className="cv">
      <div className="vip">
        <div className="cv_nav">
          <div className="container cv_nav_vip">
            <div className="cv_nav_logo">
              <NavLink to={"/"}>Tuhv Cv</NavLink>
            </div>
            <Nav />
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
      <img className="cv_bg" src={imgBg} alt="" />
    </div>
  );
};

export default Cv;
