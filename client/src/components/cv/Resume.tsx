import { useEffect } from "react";
import { DataEducation, Experience } from "./DataResume";
const Resume = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div id="resume" className="cv_resume container">
      <h2
        style={{
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        My <span className="puple">Resume</span>
      </h2>
      <div className="row">
        <div className="col-md-6 cv_resume_education">
          <h4>Education</h4>
          <div className="mt-4">
            {DataEducation &&
              DataEducation.map((i, index) => (
                <div className="cv_resume_child" key={index}>
                  <div className="cv_resume_child_i">
                    <header className="puple">{i.name}</header>
                    <i className="fa-solid fa-play cv_resume_child_icon"></i>
                  </div>
                  <span className="cv_resume_child_textShadow">{i.time}</span>
                  <main className="cv_resume_child_textShadow">
                    {i.content}
                  </main>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-6 cv_resume_experience">
          <h4>Experience</h4>
          <div className="mt-4">
            {Experience &&
              Experience.map((i, index) => (
                <div className="cv_resume_child" key={index}>
                  <div className="cv_resume_child_i">
                    <header className="puple">{i.name}</header>
                    <i className="fa-solid fa-play cv_resume_child_icon"></i>
                  </div>
                  <span className="cv_resume_child_textShadow">{i.time}</span>
                  <main className="cv_resume_child_textShadow">
                    {i.content}
                  </main>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
