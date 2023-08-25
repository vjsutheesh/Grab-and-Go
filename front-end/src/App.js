import React from "react";
import Cards from "./components/Homepage/Cards";
import Login from "./components/loginpage/login";
import Register from "./components/loginpage/register";
import Home from "./components/Homepage/Home";
import MyCart from "./components/MyCart/MyCart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/Homepage/ProductList";
import { ToastContainer } from "react-toastify";
import DropDownProfile from "./components/Navbar/DropDownProfile";
import AboutUs from "./components/loginpage/AboutUs";
import ContactUs from "./components/loginpage/ContactUs";
import Admin from "./components/Adminpage/Admin";
import OrderHistory from "./components/Navbar/order_history";
function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/aboutus">
              <AboutUs />
            </Route>
            <Route path="/history">
              <OrderHistory />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
             <Route path="/cards">
              <Cards />
            </Route> 
            <Route path="/mycart/:hotelName">
              <MyCart/>
            </Route>
            <Route path="/ProductList/:hotelName">
              <ProductList></ProductList>
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/down">
              <DropDownProfile />
            </Route>
            <Route path="/admin">
              <Admin/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
