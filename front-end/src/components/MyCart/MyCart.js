import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../Navbar/NavBar";
const MyCart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  // const[values,setValues]=useState([]);
  // data.forEach(e => {
  //   if(e.quantity>0)
  //   {
  //     setValues(e)
  //   }
  // });
  // console.log(values);
  console.log("hai");
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
        d.forEach(element => {
          setData(element)
          console.log(data)
        });
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])
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
          {data.map((i) =>(
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
        </div>
      </div>
    </>
  );
}

export default MyCart;