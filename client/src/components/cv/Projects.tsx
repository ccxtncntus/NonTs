import { useEffect } from "react";
import { DataProject } from "./DataProject";
type TProjects = {
  img: string;
  title: string;
  content: string;
  linkGit: string;
  demo: string;
};
const Projects = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div id="project" className="cv_project container">
      <div style={{ textAlign: "center" }}>
        <h2>
          Dự án <strong className="puple">của tôi </strong>
        </h2>
        <p style={{ color: "white" }}>
          Dưới đây là một số dự án tôi đã thực hiện gần đây.
        </p>
      </div>
      <div className="cv_project_dad row">
        {DataProject &&
          DataProject.map((i: TProjects, index: number) => (
            <div className="cv_project_card col-md-3" key={index}>
              <img src={i.img} alt="" />
              <span
                className="cv_project_card_title mt-2"
                style={{ display: "block" }}
              >
                {i.title}
              </span>
              <span
                className="cv_project_card_content"
                style={{ display: "block" }}
              >
                {i.content}
              </span>
              <div className="cv_project_card_btns mt-2">
                <button className="btn btn-puple">
                  <a href={i.linkGit}>
                    <i className="fa-brands fa-github"></i>
                  </a>
                </button>
                <button className="btn btn-puple">
                  <a href={i.content}>
                    <i className="fa-solid fa-laptop"></i>
                  </a>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
