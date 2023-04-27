import React from 'react';
import Biriyani from './img/Biriyani.jpg';
import { useState} from 'react';
import { useHistory } from "react-router-dom";

const Cards = () => {
    const hotels=[
    {hotelName:"Vasantham",rating:"3.5",Desc:"Hotel Vasantham is very busy in 7:00 to 9:00 in nights"},
    {hotelName:"Jallikattu",rating:"4.0",Desc:"Hotel Jallikattu is very busy in 7:00 to 9:00 in nights"},
    {hotelName:"Tea-Time",rating:"4.5",Desc:"Hotel Tea-Time is very busy in 7:00 to 9:00 in nights"},
    {hotelName:"A1-Biriyani",rating:"4.7",Desc:"Hotel A1-Biriyani is very busy in 7:00 to 9:00 in nights"}];
    const VasanthamMenu = ["Biriyani", "Fried rice", "Veg-Meals", "Non-veg Meals", "Dosai", "Parotta", "kothu-Parotta"];
    const JallikattuMenu = ["Biriyani", "Fried rice", "Dosai", "Parotta"];
    const TeaTimeMenu = ["Biriyani", "Fried rice", "Dosai", "Parotta"];
    const A1BiriyaniMenu = ["Biriyani", "Fried rice", "Dosai", "Parotta"];
    const [menuList, setMenuList] = useState(VasanthamMenu);
    const history = useHistory();
    const HandleClick = (hotelName) => {
        console.log(hotelName);
        if (hotelName === "Vasantham") {
            setMenuList(VasanthamMenu);
        }
        if (hotelName === "Jallikattu") {
            setMenuList(JallikattuMenu);
        }
        if (hotelName === "Tea-Time") {
            setMenuList(TeaTimeMenu);
        }
        if (hotelName === "A1-Biriyani") {
            setMenuList(A1BiriyaniMenu);
        }
        console.log(menuList);
        history.push('/ProductList/'+hotelName);
    }
    
    return (
        <>
            {
                hotels.map(hotel => (
                    <div className="hotel-list" data-tilt data-tilt-max="50" data-tilt-speed="400" data-tilt-perspective="500">
                        <button className='button-click' onClick={() => HandleClick(hotel.hotelName)} >
                            <div className='container-11' >
                                <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                                <div className='details'>
                                    <h1 className="title">{hotel.hotelName}</h1>
                                    <span className='rating'> {hotel.rating}&nbsp; ★</span>
                                </div>
                                <p className="desc">{hotel.Desc}</p>
                            </div>
                        </button>
                    </div>
                ))
            }
        </>
    );
}

export default Cards;