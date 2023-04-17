import React from 'react';
import Biriyani from './img/Biriyani.jpg';
import { Link } from 'react-router-dom';
const Cards = () => {
    return (
        <>
            <div className='card-container'>
                <div className="container-1" >
                    <Link to="ProductList" className='card-link'>
                        <div className='container-11' >
                            <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                            <div className='details'>
                                <h1 className="title">Vasantham</h1>
                                <span className='rating'> 3.5&nbsp; ★</span>
                            </div>
                            <p className="desc">Hotel Vasantham very busy having rudh hoyrs in 7:00 to 9:00 in nights</p>
                        </div>
                    </Link>
                </div>
                <div className="container-2">
                    <a href="/" className='card-link'>
                        <div className='container-22' >
                            <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                            <div className="details">
                                <h1 className="title">Jallikattu</h1>
                                <span className='rating'> 3.5&nbsp; ★</span>
                            </div>
                            <p className="desc">Hotel Jallikattu very busy having rudh hoyrs in 7:00 to 9:00 in nights</p>
                        </div>
                    </a>
                </div>
                <div className="container-3">
                    <a href="/" className='card-link'>
                        <div className='container-33'>
                            <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                            <div className="details">
                                <h1 className="title">Tea Time</h1>
                                <span className='rating'> 4.0&nbsp; ★</span>
                            </div>
                            <p className="desc">Hotel Tea Time very busy having rudh hoyrs in 9:00 am to 8:00 pm in day </p>
                        </div>
                    </a>
                </div>
                <div className="container-4">
                    <a href="/" className='card-link'>
                        <div className='container-44'>
                            <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                            <div className="details">
                                <h1 className="title">A1 Biriyani</h1>
                                <span className='rating'> 4.5&nbsp; ★</span>
                            </div>
                            <p className="desc">Hotel A1 Biriyani very busy having rudh hoyrs in 7:00 to 9:00 in nights</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Cards;