import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "";
    if (userName === null || userName === "") {
      isproceed = false;
      toast.info("Please enter Username", {
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    if (email === null || email === "") {
      isproceed = false;
      toast.info("Please enter Email", {
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    if (password === null || password === "") {
      isproceed = false;
      toast.info("Please enter Password", {
        autoClose: 1000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    if (!isproceed) {
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        errormessage = "Please enter the valid email";
        toast.info(errormessage, {
          autoClose: 1000,
          closeButton: false,
          hideProgressBar: true,
        });
      }
    }
    return isproceed;
  };

  const dataAlreadyExists = () => {
    let checkData = false;
    let checkName = true;
    let checkEmail = true;
    console.log(data);
    {
      data.forEach((userData) => {
        if (userData["userName"] === userName) {
          checkName = false;
          toast.warning("Username already exists", {
            autoClose: 1000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
        if (userData["email"] === email) {
          checkEmail = false;
          toast.warning("Email address already exists", {
            autoClose: 1000,
            closeButton: false,
            hideProgressBar: true,
          });
        }
      });
    }
    if (checkName === true && checkEmail === true) {
      checkData = true;
    }

    return checkData;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let regobj = { userName, email, password };

    if (IsValidate() && dataAlreadyExists()) {
      fetch("http://127.0.0.1:5000/getdata", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then(() => {
          toast.success("Registered Sucessfully!", {
            autoClose: 1000,
            closeButton: false,
            hideProgressBar: true,
          });
          history.push("/");
        })
        .catch((err) => {
          toast.error("Server error:" + err, {
            autoClose: 3000,
            closeButton: false,
            hideProgressBar: true,
          });
        });
    }
  };
  useEffect(() => {}, []);

  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/data")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        toast.error("Register page not working.", {
          autoClose: 3000,
          closeButton: false,
          hideProgressBar: true,
        });
      });
  }, []);

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
            <Link to="/" className="login" style={{ color: "white" }}>
              Login
            </Link>
            <Link to="/aboutus" className="about">
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
                  type="text"
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
                  id="myInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  class="fa fa-eye eye-icon"
                  type="button"
                  onClick={showPassword}
                ></i>
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
