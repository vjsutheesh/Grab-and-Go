import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    let current_user = sessionStorage.getItem("current_user");

    useEffect(() => {
        fetch("http://127.0.0.1:5000/history")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setOrderHistory(data);
            console.log(data);
        })
        .catch((error) => {
            console.error("Error fetching order history:", error)
            toast.error("Unable to fetch data", {
                autoClose: 1000,
                closeButton: false,
                hideProgressBar: true,
            });
        });
        fetch("http://127.0.0.1:5000/currentuser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ "user": current_user }),
      })
      .then((response) => {
        if (response.ok) {
          console.log(current_user);
          return response.json(); 
        } else {
          throw new Error("Network response was not ok");
        }
      })
        .catch((err) => {
          console.log(err)
        });
    }, []);

    console.log(orderHistory);

    return ( 
        <div className="main_container">
            <div className="nav_cointer">
                <NavBar></NavBar>
            </div>
            <div className="order-history-container">
                <h2 className="h-title">Order History</h2>
                {orderHistory && orderHistory["order_history"] ? (
                    orderHistory["order_history"].map((order, index) => {
                        let amount = 0;
                        order.items.forEach(item => {
                            amount += item.price * item.quantity;
                        });

                        return (
                            <div key={index} className="order-history-item">
                                <div className="history_head">
                                    <p className="history_hotel_name">
                                        {order.hotel}
                                    </p>
                                    <p className="order-history-date">
                                        {new Date(order.date).toLocaleString()}
                                    </p>
                                </div>
                                <div className="history-body">
                                    <div className="hheading">
                                        <p>Item</p>
                                        <p style={{margin: "19px 0px 0px 90px"}}>Price</p>
                                        <p>Quantity</p>
                                    </div>
                                    <div className="hitem">
                                        {order.items.map((item, itemIndex) => (
                                            <div className="hhitem" key={itemIndex}>
                                                <p class="table-cell">{item.DishName}</p>
                                                <p class="table-cell h-price">{item.price}</p>
                                                <div className="hquality">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="htotal">
                                    <p>Total : ₹{amount}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
 
export default OrderHistory;
