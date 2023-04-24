import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";
import { useState, useEffect } from "react";

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
                  history.push("/home");
                }
              }
            });
          }
          if (flag) {
            console.log("Invalid Username or Password");
          } else {
            console.log("Logged In successfully!");
          }
        })
        .catch((err) => {
          console.log("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (inputName === null || inputName === "") {
      result = false;
      console.log("Please Enter Username");
    }
    if (password === null || password === "") {
      result = false;
      console.log("Please Enter Password");
    }
    return result;
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
                  onChange={(e) => setPassword(e.target.value)}
                />
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
