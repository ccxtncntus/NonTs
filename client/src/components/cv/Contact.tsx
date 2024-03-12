import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div id="contact" className="cv_contact">
      <h2>
        Liên hệ <strong className="puple">với tôi </strong>
      </h2>
      <p style={{ color: "white" }}>Để lại thông tin của bạn</p>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="exampleFormControlSelect2">
                <span className="puple">Tên</span> của bạn
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleFormControlSelect2">
                <span className="puple">Email</span> của bạn
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="exampleFormControlSelect2">Thông tin</label>
            <input
              type="text"
              className="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter thông tin"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="exampleFormControlSelect2">Lời nhắn</label>
            <textarea
              rows={3}
              className="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Tin nhắn"
            />
          </div>
          <div className="mt-4">
            <button className="btn btn-puple">Gửi</button>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Contact;
