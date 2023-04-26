import NavBar from "../Navbar/NavBar.js";
import BasicSlider from "./BasicSlider.js";
import Cards from "./Cards.js";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="NavBar">
          <NavBar></NavBar>
        </div>
        <div className="body-content">
          <BasicSlider className="basic-slider" />
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
          <div className="wrapper">
            <Cards></Cards>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
