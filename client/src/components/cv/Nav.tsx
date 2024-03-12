import { useEffect } from "react";
import { NavLink } from "react-router-dom";
const Nav = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const newHash: string = window.location.hash;
      // let a = newHash.substring(1);
      console.log(newHash);
    };
    window.addEventListener("hashchange", handleHashChange);
    // Đảm bảo gỡ bỏ sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return (
    <div className="cv_nav_menu">
      <ul>
        <li>
          <NavLink to={"/cv/home"}>Home</NavLink>
          {/* <a href={"#"}>Home</a> */}
        </li>
        <li>
          <NavLink to={"/cv/resume"}>resume</NavLink>
          {/* <a href={"#resume"}>resume</a> */}
        </li>
        <li>
          <NavLink to={"/cv/about"}>about</NavLink>
          {/* <a href={"#about"}>about</a> */}
        </li>
        <li>
          <NavLink to={"/cv/projects"}>project</NavLink>
          {/* <a href={"#project"}>project</a> */}
        </li>
        <li>
          <NavLink to={"/cv/contact"}>contact</NavLink>
          {/* <a href={"#contact"}>contact</a> */}
        </li>
        <li>
          <NavLink to={"/download-cv"}>download</NavLink>
          {/* <a href={"#contact"}>contact</a> */}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
