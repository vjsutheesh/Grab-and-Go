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
    const history = useHistory();
    const HandleClick = (hotelName) => {
        console.log(hotelName);
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
                                    <h1 className="title-hotel">{hotel.hotelName}</h1>
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