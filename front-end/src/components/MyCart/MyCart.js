import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../Navbar/NavBar";
const MyCart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch('http://127.0.0.1:5000/cartItems')
      .then((res) => {
        if (!res.ok) { // error coming back from server
          throw Error('Unable to get the resource');
        }
        console.log(res)
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setData(data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])
  console.log(data)
  console.log(error)
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
          <div className="seperator-cart"></div>
          <div className="selected-items">
            <div className="item">
              <p>Fried rice</p>
            </div>
            <div className="price">
              <p>80</p>
            </div>
            <div className="quantitty">
              <p>2</p>
            </div>
            <div className="subtotal">
              <p>160</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;