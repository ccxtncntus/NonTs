import { NavLink } from "react-router-dom";
import ThemeCv from "./ThemeCv";
import "./downloadcv.css";
import imgCv from "../../../assets/imgdownCv.jpg";
const DownLoad = () => {
  return (
    <div className="downloadCV" style={{ backgroundImage: `url("${imgCv}")` }}>
      <div className="downloadCV_vip">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <NavLink to={"/cv/home"} className="btn btn-primary mb-2">
              Home
            </NavLink>{" "}
            <ThemeCv />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default DownLoad;
