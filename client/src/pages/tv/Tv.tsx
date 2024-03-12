import "./tv.css";
import ReactPlayer from "react-player/lazy";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Tv = () => {
  const [URL, setURL] = useState<string>("");
  const [urlBlob, seturlBlob] = useState<string>("");
  const [isAdd, setisAdd] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const handeAddUrl = (): void => {
    setisError(false);
    setURL(urlBlob);
    setisLoading(true);
  };
  const handleAdd = (): void => {
    setisAdd(true);
  };
  const handleReady = (): void => {
    setisError(false);
    setisAdd(false);
    seturlBlob("");
    setisLoading(false);
  };
  const handleE = (): void => {
    setisError(true);
    setisLoading(false);
  };

  useEffect(() => {
    document.title = "Non-Premium!";
  }, []);
  return (
    <div className="tv">
      <NavLink to={"/"} className={"btn tv_home"}>
        <i className="fa-solid fa-house"></i>
      </NavLink>
      {!isAdd && (
        <Button variant="" onClick={handleAdd} className="tv_add">
          <i className="fa-solid fa-plus"></i>
        </Button>
      )}
      <section className="tv_bg row">
        {isAdd && (
          <div className="col-md-3">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={urlBlob}
                  id="url_tv"
                  onChange={(e) => seturlBlob(e.target.value)}
                />
              </Form.Group>
              <Button
                disabled={urlBlob == ""}
                variant=""
                className="tvbtn"
                onClick={handeAddUrl}
              >
                Add
              </Button>{" "}
              <Button
                variant=""
                className="btn tvbtn"
                onClick={() => setisAdd(false)}
              >
                Cancel
              </Button>
            </Form>
          </div>
        )}
        <div className={isAdd ? "col-md-9" : "col-md-12"}>
          {isError && "Lỗi url"}
          {URL == "" && "Chưa có data"}
          {isLoading && "Đang tải..."}
          {!isError && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"100%"}
              url={URL}
              onReady={handleReady}
              onError={handleE}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Tv;
