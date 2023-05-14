import { useHistory } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    history.push("/");
  };

  const HandleFeedbackSubmit = (e) => {
    e.preventDefault();
    let data = { email, name, address, message };
    fetch("http://127.0.0.1:5000/getfeedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("Message send sucessfully", {
          autoClose: 1000,
          closeButton: false,
          hideProgressBar: true,
        });
      })
      .then(() => {
        setEmail("");
        setAddress("");
        setName("");
        setMessage("");
      })
      .catch((err) => {
        toast.error("Server error", {
          autoClose: 3000,
          closeButton: false,
          hideProgressBar: true,
        });
      });
  };

  return (
    <>
      <div className="contactus-body">
        <div className="contactus-header">
          <div className="contact-content">
            <div className="contact-left">
              <div className="contact-title">CONTACT US</div>
              <div className="block">
                <div className="sub-block">
                  <i class="fa fa-phone contact-icon"></i>
                  <div className="subtitle">Call Us</div>
                </div>
                <p className="detail">6382661948 , 6382888824 , 6381114854</p>
              </div>
              <div className="block">
                <div className="sub-block">
                  <i class="fa fa-map-marker contact-icon"></i>
                  <div className="subtitle">Location</div>
                </div>
                <p className="detail">
                  Department of Computer Science and Engineering, GCE - Salem.
                </p>
              </div>
              <div className="block">
                <div className="sub-block">
                  <i class="fa fa-clock-o contact-icon"></i>
                  <div className="subtitle">Business Hours</div>
                </div>
                <p className="detail">
                  Mon - Fri.... 9 am - 6 pm, Sat, Sun.... Closed
                </p>
              </div>
            </div>
            <div className="contact-right">
              <button className="close-icon" onClick={handleClose}>
                <i class="fa fa-close"></i>
              </button>
              <form className="contact-form">
                <div className="form-first">
                  <div className="contact-email">
                    <label className="contact-label" htmlFor="Email">
                      Email
                    </label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="Enter a valid email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="contact-name">
                    <label className="contact-label" htmlFor="Name">
                      Name
                    </label>
                    <input
                      className="contact-input"
                      type="text"
                      placeholder="Enter your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-second">
                  <label className="contact-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="contact-input"
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-third">
                  <label className="contact-label" htmlFor="messeage">
                    message
                  </label>
                  <textarea
                    cols="60"
                    rows="5"
                    className="contact-input2"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  className="contact-submit"
                  onClick={HandleFeedbackSubmit}
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="contactus-footer">
          <div className="contact-social-media-link">
            <a href="#" className="contact-sicon">
              <i class="fa fa-envelope "></i>
            </a>
            <a href="#" className="contact-sicon">
              <i class="fa fa-instagram "></i>
            </a>
            <a href="#" className="contact-sicon">
              <i class="fa fa-linkedin"></i>
            </a>
            <a href="#" className="contact-sicon">
              <i class="fa fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
