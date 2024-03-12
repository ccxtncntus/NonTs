import { useEffect } from "react";
import imgAbout from "../../assets/about.png";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
} from "react-icons/di";
import { SiVisualstudiocode, SiPostman } from "react-icons/si";
const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div id="about" className="cv_about container">
      <div className="row about_info">
        <div className="col-md-6 cv_about_information">
          <h2
            style={{
              paddingBottom: "20px",
              textAlign: "center",
            }}
          >
            Bản thân
          </h2>
          <p style={{ textAlign: "justify", fontSize: "1.3rem" }}>
            Chào mọi người, Tôi là <span className="puple">Name space </span>
            đến từ <span className="puple"> Nam dong - Đăk Nông</span>
            <br />
            Hiện tại tôi là sinh viên của cao đẳng FPT
            <br />
            <br />
            Ngoài việc code, một số hoạt động khác mà tôi thích làm!
          </p>
          <ul className="cv_about_information_menu">
            <li className="about-activity">
              <i className="fa-solid fa-arrow-right"></i> Chơi game
            </li>
            <li className="about-activity">
              <i className="fa-solid fa-arrow-right"></i> Viết Blog
            </li>
            <li className="about-activity">
              <i className="fa-solid fa-arrow-right"></i> Du lịch
            </li>
          </ul>
          <div style={{ textAlign: "center" }} className="mt-4">
            <p style={{ color: "rgb(155 126 172)", fontSize: "1.2rem" }}>
              "Hãy nỗ lực xây dựng những điều tạo nên sự khác biệt!"{" "}
            </p>
            <footer
              style={{ color: "rgb(155 126 172)", fontSize: "1.2rem" }}
              className="blockquote-footer"
            >
              Chat GPT
            </footer>
          </div>
        </div>
        <div className="col-md-6 cv_about_img">
          <img src={imgAbout} alt="" />
        </div>
      </div>
      <div className="about_skill">
        <h2
          style={{
            paddingBottom: "20px",
            textAlign: "center",
          }}
        >
          Kĩ năng
        </h2>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col xs={4} md={2} className="tech-icons">
            <CgCPlusPlus />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <DiJavascript1 />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <DiNodejs />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <DiReact />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <DiMongodb />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <DiGit />
          </Col>
        </Row>
      </div>

      <div className="about_skill">
        <h2
          style={{
            paddingBottom: "20px",
            textAlign: "center",
          }}
        >
          <span className="puple">Tool</span> Sử dụng
        </h2>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col xs={4} md={2} className="tech-icons">
            <SiVisualstudiocode />
          </Col>
          <Col xs={4} md={2} className="tech-icons">
            <SiPostman />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About;
