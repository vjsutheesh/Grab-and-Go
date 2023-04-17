import React from "react";
import Login from "./components/loginpage/login";
import Register from "./components/loginpage/register";
import Home from "./components/Homepage/Home";
import SignUp from "./components/signupPage/signup";
import MyCart from "./components/MyCart/MyCart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/Homepage/ProductList";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/mycart">
            <MyCart />
          </Route>
          <Route path="/ProductList">
            <ProductList></ProductList>
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
