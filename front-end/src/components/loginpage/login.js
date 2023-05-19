import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const [inputName, setInputname] = useState("");
  const [password, setPassword] = useState("");
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch("http://127.0.0.1:5000/data")
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          let flag = true;
          {
            Object.values(resp).map((userData) => {
              if (userData["userName"] === inputName) {
                if (userData["password"] === password) {
                  flag = false;
                  sessionStorage.setItem("username", inputName);
                  toast.success("Login Successfully", {
                    autoClose: 1000,
                    closeButton: false,
                    hideProgressBar: true,
                  })
                  history.push("/home");
                }
              }
            });
          }
          if (flag) {
            toast.warning("Invalid Username or Password", {
              autoClose: 1000,
              closeButton: false,
              hideProgressBar: true,
            });
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message, {
            autoClose: 3000,
            closeButton: false,
            hideProgressBar: true,
          });
        });
    }
  };
  const validate = () => {
    let result = true;
    if (inputName === null || inputName === "") {
      result = false;
      toast.info("Please Enter Username", {
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    if (password === null || password === "") {
      result = false;
      toast.info("Please Enter Password", {
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    return result;
  };

  const showPassword = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left-side">Grab & Go</div>
          <div className="right-side">
            <Link to="/" className="login">
              Login
            </Link>
            <Link to="/contactus" className="about">
              Contact us
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
            <form className="login-form" onSubmit={HandleSubmit}>
              <div className="input-icons">
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className="username"
                  value={inputName}
                  onChange={(e) => setInputname(e.target.value)}
                />
                <i class="fa fa-key icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  value={password}
                  id="myInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  // class="fa fa-eye eye-icon"
                  className="eye-icon"
                  type="button"
                  onClick={showPassword}
                ></i>
              </div>
              <button className="submit-btn">Login</button>
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
