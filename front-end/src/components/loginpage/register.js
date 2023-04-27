import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";
import { useState } from "react";
import { useEffect } from "react";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in";
    if (userName === null || userName === "") {
      isproceed = false;
      errormessage += "Username";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += "Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += "Email";
    }
    if (!isproceed) {
      console.log(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        errormessage = "Please enter the valid email";
        console.log(errormessage);
      }
    }
    return isproceed;
  };

  const dataAlreadyExists = () => {
    let checkData = false;
    let checkName = true;
    let checkEmail = true;

    return fetch("http://127.0.0.1:5000/data")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        {
          Object.values(resp).map((userData) => {
            if (userData["userName"] === userName && checkName) {
              checkName = false;
              console.log("Username already exists");
            }
            if (userData["email"] === email && checkEmail) {
              checkEmail = false;
              console.log("Email address already exists");
            }
          });
        }
        if (checkName === true && checkEmail === true) {
          checkData = true;
        }
        return checkData;
      })
      .catch((err) => {
        console.log("Server error" + err.message);
      });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let regobj = { userName, email, password };
    setTimeout(() => {
      console.log(dataAlreadyExists.checkData);
    }, 1000);

    if (IsValidate() && dataAlreadyExists()) {
      fetch("http://127.0.0.1:5000/getdata", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then(() => {
          console.log(regobj);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(()=>{},[])
  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left-side">Grab & Go</div>
          <div className="right-side">
            <Link to="/" className="login" style={{ color: "white" }}>
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
            <form className="login-form" onSubmit={HandleSubmit}>
              <div className="input-icons">
                <i className="fa fa-user icon"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <i className="fa fa-envelope icon"></i>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  className="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i class="fa fa-key icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  minlength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="submit-btn">Register</button>
              <p className="account">
                Already have an account ?
                <span>
                  {" "}
                  <Link to="/" className="new-register">
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

export default Register;
