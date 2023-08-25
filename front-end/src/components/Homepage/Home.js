import NavBar from "../Navbar/NavBar.js";
import BasicSlider from "./BasicSlider.js";
import Cards from "./Cards.js";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    let current_user = sessionStorage.getItem("current_user");
    if (username === "" || username === null) {
      history.push("/");
    }
    fetch("http://127.0.0.1:5000/currentuser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ "user": current_user }),
      })
      .then((response) => {
        if (response.ok) {
          console.log(current_user);
          return response.json(); 
        } else {
          throw new Error("Network response was not ok");
        }
      })
        .catch((err) => {
          console.log(err)
        });
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="body-first">
          <div className="NavBar">
            <NavBar></NavBar>
          </div>
          <div className="body-content">
            <BasicSlider className="basic-slider" />
          </div>
        </div>
        <div className="body-text">
          <h1 className="body-text-heading">
            Save your time by Pre-Ordering . . .{" "}
          </h1>
          <p className="body-text-content">
            You can able to save your time by pre-ordering in your favourite
            hotels throughour Grab & Go platform.We ease your work and save your
            time.{" "}
          </p>
          <section id="cards">
            <div className="wrapper">
              <Cards></Cards>
            </div>
          </section>
        </div>
        {/* <div>
          <Footer/>
        </div> */}
      </div>
    </>
  );
};

export default Home;
