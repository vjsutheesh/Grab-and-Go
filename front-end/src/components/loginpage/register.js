import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";

const Login = () => {
  const history = useHistory();
  const HandleSubmit = () => {
    history.push("/login");
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left-side">Grab & Go</div>
          <div className="right-side">
            <Link to="/login" className="login" style={{ color: "white" }}>
              login
            </Link>
            <Link to="/" className="about">
              About Us
            </Link>
            <Link
              to="/register"
              className="register"
              style={{ color: "lightgreen" }}
            >
              Register
            </Link>
          </div>
        </div>
        <div className="body">
          <div className="body-container">
            <div className="logo">
              <img src={Grab} alt="Loading...." />
            </div>
            <form className="login-form">
              <div className="input-icons">
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className="username"
                />
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className="username"
                />
                <i class="fa fa-key icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                />
              </div>
              <button className="submit-btn" onClick={HandleSubmit}>
                Submit
              </button>
              <p className="account">
                Already have an account ?
                <span>
                  {" "}
                  <Link to="/login" className="new-register">
                    Login
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
