import React from "react";
import Biriyani from "./img/Biriyani.jpg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Cards = () => {
  const [motels, setMotels] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetch("http://127.0.0.1:5000/hotel_data")
      .then((Response) => {
        console.log(Response);
        return Response.json();
      })
      .then((data) => {
        setMotels(data);
        console.log(data);
      })
      .catch((err) => {
        toast.error("Failed to fetch data. Please try again.", {
          autoClose: 3000,
          closeButton: false,
          hideProgressBar: true,
        });
      });
  },[]);
  const HandleClick = (hotelName) => {
    console.log(hotelName);
    history.push("/ProductList/" + hotelName);
  };
  return (
    <>
      {motels.map((motel) => (
        <div
          className="hotel-list"
          data-tilt
          data-tilt-max="50"
          data-tilt-speed="400"
          data-tilt-perspective="500"
          key={motel._id} // Add a unique key for each element in the map
        >
          <button
            className="button-click"
            onClick={() => HandleClick(motel.hotelName)}
          >
            <div className="container-11">
              <img
              className="image-11"
                src={Biriyani}
                alt="loading ..."
                style={{ width: "400px" }}
              />
              <div className="details">
                <h1 className="title-hotel">{motel.hotelName}</h1>
                <span className="rating"> {motel.rating}&nbsp; ★</span>
              </div>
              <p className="desc">{motel.Desc}</p>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

export default Cards;
