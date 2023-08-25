import { Link, useHistory } from "react-router-dom";
import Grab from "./Grab.png";
// import { useState,useEffect } from "react";
import { MdWhereToVote, MdSearch } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { CgShoppingCart } from "react-icons/cg";
import DropDownProfile from "./DropDownProfile";
import { useEffect, useState } from "react";
const NavBar = () => {
  const [openProfile, setOpenprofile] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const handleFilter = (value) => {
    const filteredData = hotels.filter((hotel) => {
      return hotel.hotelName.toLowerCase().includes(value.toLowerCase());
    });
    setFilterdata(filteredData);
  };
  useEffect(() => {
    fetch("http://127.0.0.1:5000/hotel_data")
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setHotels(data);
        console.log(hotels);
        setFilterdata(data);
        console.log(filterdata);
      })
  },[]); 
  const history = useHistory();
  const HandleClick = (hotelName) => {
    console.log(hotelName);
    history.push("/ProductList/" + hotelName);
  };

  return (
    <>
      <div className="header-home">
        <div className="image-logo">
          <Link to="/home" className="logo-link">
            <img src={Grab} alt="Loading...." />
          </Link>
        </div>
        <div className="header-right">
          <div className="header-location-bar">
            <div className="location-wrap">
              <div className="location-icon">
                <MdWhereToVote className="iconloc absolute-center" />
                <div>Salem</div>
              </div>
              <IoMdArrowDropdown />
            </div>
            <div className="seperator"></div>
            <div className="search-bar">
              <div className="search-first">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  className="search-text"
                  placeholder="Search for a restaurant"
                  onChange={e => handleFilter(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              {isSearchFocused && (
                <>
                  {filterdata.length > 0 && (
                    <div className="search-list">
                      {filterdata.map((hotel, index) => (
                        <a
                          onMouseDown={() => HandleClick(hotel.hotelName)}
                          className="result-item"
                          key={index}
                        >
                          {hotel.hotelName}
                        </a>
                      ))}
                    </div>
                  )}
                  {filterdata.length === 0 && (
                    <div className="no-results">No matching results found</div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="profile-wrapper">
            <div className="cart-bar">
              <a  className="mycart-icon">
                <CgShoppingCart />
              </a>
              <a href="/mycart/:hotelName" className="mycart-name">
                My Cart
              </a>
            </div>
            <div className="account-details">
              <a
                href="#"
                className="header-username"
                onClick={() => setOpenprofile((openProfile) => !openProfile)}
              >
                {sessionStorage.getItem("username")}
              </a>
              <p>
                <VscAccount className="header-profile-image" />
              </p>
            </div>
          </div>
        </div>
      </div>
      {openProfile && <DropDownProfile />}
    </>
  );
};

export default NavBar;
