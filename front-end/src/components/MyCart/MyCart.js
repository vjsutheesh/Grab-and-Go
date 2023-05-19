import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "./loading.json";
import confirm from "./order-confirm.json";
import order from "./order.json";
import Home from "../Homepage/Home";
const MyCart = () => {
  const history = useHistory();
  const { hotelName } = useParams();
  let hotel = hotelName
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([])
  const [error, setError] = useState("");
  const [values, setValues] = useState([]);
  const [pending, setPending] = useState("")
  const [status, setStatus] = useState(false)
  const [show, setShow] = useState(false)
  const [Time, setTime] = useState("")
  let amount = 0;
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

  data.forEach(i => {
    amount = amount + (i.price * i.quantity);
  })
  
  const handleItems = () => {
    toast.success("Order placed sucessfully", {
      autoClose: 1000,
      closeButton: false,
      hideProgressBar: true
    })
    setPending(true);
    setStatus(false);
    let obj = { hotelName, amount }
    fetch("http://127.0.0.1:5000/postadmin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
  }
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
                    time = (time + 5) * (i.quantity);
                }
                else if (i.DishName === "Noodles") {
                  time = (time + 5) * (i.quantity);
              }
              else if (i.DishName === "Veg-Meals") {
                time = (time + 4) * (i.quantity);
            }
            else if (i.DishName === "Non-veg Meals") {
              time = (time + 4) * (i.quantity);
          }
          else if (i.DishName === "Dosai") {
            time = (time + 2) * (i.quantity);
        }
        else if (i.DishName === "Parotta") {
          time = (time + 2) * (i.quantity);
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
  const confirmOrder = () =>{
    fetch('http://127.0.0.1:5000/outadmin')
        .then((res) => {
          if (!res.ok) { // error coming back from server
            throw Error('Unable to get the resource');
          }
          return res.json();
        })
        .then((d) => {
          console.log(d)
          setData2(d)
          data2.map((i) => {
            setStatus(i.status)
            setPending(false)
            setTime(i.total_time)
          })
        })
        .catch((err) => {
          setError(err.message)
        })
  }
  const order = () => {
    history.push('/admin')
  }
  useEffect(() => {
    setTimeout(() => setShow(true), 10000);
  }, []);
  useEffect(()=>{},[confirmOrder,status])
  if (data.length > 0) {
    return (
      <>
        <div className="mycart">
          <div className="NavBar">
            <NavBar></NavBar>
          </div>
          <div className="my-cart">
            <div className="cart-menu">
              <div className="item">
                <h4>ITEM</h4>
              </div>
              <div className="price">
                <h4>PRICE</h4>
              </div>
              <div className="quantitty">
                <h4>QUANTITY</h4>
              </div>
              <div className="subtotal">
                <h4>SUBTOTAL</h4>
              </div>
            </div>
            <div className="seperator-cart-1"></div>
            {data.map((i) => (
              <div className="selected-items">
                <div className="item">
                  <p>{i.DishName}</p>
                </div>
                <div className="price">
                  <p>{i.price}</p>
                </div>
                <div className="quantitty">
                  <p>{i.quantity}</p>
                </div>
                <div className="subtotal">
                  <p>{i.price * i.quantity}</p>
                </div>
              </div>
            ))
            }
            <div className="seperator-cart-2"></div>
            <button className="amount" onClick={() => handleItems()}>
              <h5>PLACE ORDER </h5>
              <h5>₹{amount}</h5>
            </button>
            {pending && <div className="information">
              <h1>Please wait</h1>
              <div className="loading-anim">
                <Lottie animationData={loading}></Lottie>
              </div>
              <p style={{ fontSize: "24px" }}>while we processing your order . . .</p>
              {show && <div>
                <button onClick={()=> confirmOrder()} className="confirm-order">
                  <h3>Confirm Order</h3>
                </button>
              </div>}
            </div>}
            {
              status && <div className="delivery-component">
                <div>
                <h1>Order Confirmed . ! </h1>
                </div>
                <div className="loading-anim2">
                <Lottie animationData={confirm}></Lottie>
                </div>
                <div>
                <h5 className="delivery-time">Your order will be ready after {total_time} .</h5>
                </div>
                
              </div>
            }
          </div>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="mycart">
          <div className="NavBar">
            <NavBar></NavBar>
          </div>
          <div className="order-nothing">
            <h1>your cart is empty . . .</h1>
          </div>
          {/* <div>
            <a href="#">Order something here</a>
          </div> */}
        </div>
      </>
    )
  }
}

export default MyCart;