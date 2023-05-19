import { useParams } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
const ProductList = () => {
    const history = useHistory();
    const { hotelName } = useParams();
    const [error, setError] = useState("");
    const [hotel_desc, setHotel_desc] = useState([]);
    const [Menu_List, setMenu_List] = useState([]);
    const [quantity, setQuantity] = useState();
    const [selected_items, setSelectesItems] = useState([]);
    
    const handleDecrement = (quantity, dishname) => {
        Menu_List.forEach(menu => {
            if (menu.DishName === dishname) {
                if (quantity > 0) {
                    setQuantity(menu.quantity--)
                }
            }
        });
    }
    const handleIncrement = (quantity, dishname) => {
        Menu_List.forEach(menu => {
            if (menu.DishName === dishname) {
                setQuantity(menu.quantity++)
            }
        });
    }
    useEffect(() => {},[quantity])
    const handleItems = (items) => {
        setSelectesItems(items);
    }
    useEffect(()=>{
        if(selected_items.length<1)
        return;
        console.log("selected items :")
        console.log(selected_items)
        fetch("http://127.0.0.1:5000/selectedItem", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(selected_items),
      })
      .then(()=>{
        history.push('/mycart/'+hotelName);
      })},[selected_items])

    console.log("welcome to " + hotelName)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/MenuList/' + hotelName)
            .then((res) => {
                if (!res.ok) { // error coming back from server
                    throw Error('Unable to get the resource');
                }
                return res.json();
            }
            )
            .then((data) => {
                setMenu_List(data)
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
            })
        fetch('http://127.0.0.1:5000/HotelDesc/' + hotelName)
            .then((res) => {
                if (!res.ok) { // error coming back from server
                    throw Error('Unable to get the resource');
                }
                return res.json();
            })
            .then((data) => {
                setHotel_desc(data);
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [hotelName]
    )

    return (
        <><div className="product-page">
            <div className="NavBar">
                <NavBar></NavBar>
            </div>
            {hotel_desc.map(i => (
                <div className="hotel-desc">
                    {/* <div className="seperator"></div> */}
                    <div className="hotel-logo">
                        <h1>{i.hotelName}</h1>
                    </div>
                    <span className='rating'> {i.rating}&nbsp; ★</span>
                    <h5>{i.Desc}</h5>
                    <h5>{i.location}</h5>
                    <div className="seperator-bar"></div>
                    <div className="hotel-menu">
                        <i class="fa fa-bars" aria-hidden="true"></i>
                        <h3>MENU</h3>
                    </div>
                    {
                        Menu_List.map(menu => (
                            <div>
                                <h3>{menu.DishName}</h3>
                                <div className="pricing">
                                    <i class="fa fa-inr" aria-hidden="true"></i>
                                    <p className="price-value">{menu.price}</p>
                                </div>
                                <div className="quantity">
                                    <button type="button" onClick={() => handleDecrement(menu.quantity, menu.DishName)} className="input-group-text">-</button>
                                    <div className="quantity-value">{menu.quantity}</div>
                                    <button type="button" onClick={() => handleIncrement(menu.quantity, menu.DishName)} className="input-group-text">+</button>
                                </div>
                                <div className="seperator-food"></div>
                            </div>
                        ))
                    }
                </div>
            ))
            }
            <div className="button-box">
                <button type="button" className="cart-button" onClick={() => handleItems(Menu_List)}>Add to Cart </button>
            </div>
        </div>
        </>
    );
}
export default ProductList;
