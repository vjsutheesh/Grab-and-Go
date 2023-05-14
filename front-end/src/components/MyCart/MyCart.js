import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NavBar from "../Navbar/NavBar";
import { toast } from "react-toastify";
const MyCart = () => {
  const { hotelName } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const[values,setValues]=useState([]);
  let amount = 0;
  console.log("grab"+hotelName)
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cartItems')
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('Unable to get the resource');
        }
        console.log(res)
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
      amount=amount+(i.price * i.quantity);
    })
    const handleItems = () => {
      toast.success("Order placed sucessfully", {
          autoClose: 1000,
          closeButton: false,
          hideProgressBar: true})
          let obj = {hotelName,amount}
          fetch("http://127.0.0.1:5000/postadmin", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(obj),
          })
  }
  if (data.length > 0)
  {
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
        </div>
        <div>
          <a href="/admin">Order something here</a>
        </div>
      </div>
      
    </>
  );}
    else 
    {
      return(
        <>
        <div className="mycart">
        <div className="NavBar">
          <NavBar></NavBar>
        </div>
        <div className="order-nothing">
          <h1>you haven't order anything . . .</h1>
        </div>
        <div>
          <a href="/admin">Order something here</a>
        </div>
        </div>
        </>
      )
    }
}

export default MyCart;