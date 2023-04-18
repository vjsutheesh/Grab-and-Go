import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";

const Login = () => {
  const history = useHistory();
  const HandleSubmit = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left-side">Grab & Go</div>
          <div className="right-side">
            <Link to="/" className="login">
              login
            </Link>
            <Link to="/" className="about">
              About Us
            </Link>
            <Link to="/register" className="register">
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
                <i class="fa fa-key icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                />
              </div>
              <button className="submit-btn" onClick={HandleSubmit}>
                Login
              </button>
              <p className="account">
                Don't have an account ?
                <span>
                  {" "}
                  <Link to="/register" className="new-register">
                    Register
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
