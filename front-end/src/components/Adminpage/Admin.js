import { useEffect, useState } from "react";
import React from "react";
import Grab from "./Grab.png"
import { useParams } from "react-router-dom";
const Admin = () => {
    // const { hotelName } = useParams()
    const [hotel, setHotel] = useState("")
    const [value, setValue] = useState([])
    const [error, setError] = useState("null");
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(true)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/cartItems')
            .then((res) => {
                if (!res.ok) { // error coming back from server
                    throw Error('Unable to get the resource');
                }
                return res.json();
            })
            .then((d) => {
                setData(d)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [])
    useEffect(() => {
        fetch("http://127.0.0.1:5000/getadmin").then((res) => {
            if (!res.ok) { // error coming back from server
                throw Error('Unable to get the resource');
            }
            return res.json();
        })
            .then((v) => {
                setValue(v)
                console.log(value)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [])
    let amount = 0;
    let hotelName = "";
    value.forEach(i => {
        hotelName = i.hotelName;
        amount = i.amount;
    })
    const handleDelivery = () => {
        let time = 0;
        let total_hrs = 0;
        let total_min = 0;
        let total_time = 0;
        data.forEach(
            i => {
                if (i.DishName === "Biriyani") {
                    time = (time + 2) * (i.quantity);
                }
                else if (i.DishName === "Fried rice") {
                    time = (time + 4) * (i.quantity);
                }
            }
        )
        if (time > 60) {
            total_hrs = time / 60;
            total_min = time % 60;
            total_time = total_hrs + " hr " + total_min + " mins";
        }
        else {
            total_min = time % 60;
            total_time = total_min + " mins";
        }
        console.log("time taken is " + total_time)
        setStatus(true)
        const obj = { status, total_time }
        fetch("http://127.0.0.1:5000/inadmin", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(obj),
        })
        setStatus(false)
    }

    return (
        <>
            <div>
                <div className="admin-bar">
                    <div className="image-logo">
                        <img src={Grab} alt="Loading...." />
                    </div>
                    <div className="content-bar">
                        <h2>Welcome to {hotelName}</h2>
                    </div>
                </div>
                <div className="detaill">
                    <h3>Order details</h3>
                </div>
                <div className="seperator-cart-admin"></div>
                <div className="admin-content">
                    <div className="content-title">
                        <div className="item">
                            <h4>ITEM</h4>
                        </div>
                        <div className="price">
                            <h4>PRICE</h4>
                        </div>
                        <div className="quantitty">
                            <h4>QUANTITY</h4>
                        </div>
                    </div>
                    {data.map((i) => (
                        <div className="items-list">
                            <div className="item">
                                <p>{i.DishName}</p>
                            </div><div className="price">
                                <p>{i.price}</p>
                            </div><div className="quantitty">
                                <p>{i.quantity}</p>
                            </div>
                        </div>
                    ))
                    }
                    <div className="amount-1">
                        <h5>TO PAY</h5>
                        <h5>{amount}</h5>
                    </div>
                </div>
                <div className="delivery">
                    <button className="delivery-button" onClick={() => handleDelivery()}>
                        OUT FOR PICK-UP
                    </button>
                </div>
            </div>
        </>
    );
}
export default Admin;


// http://localhost:3000/admin