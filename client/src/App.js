import React, { Component } from "react";
import "./App.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./vendor/simple-line-icons/css/simple-line-icons.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Enroll from "./Components/Enroll";
import Home from "./Components/Home";
import Wallets from "./Components/Wallets";
import AdminNav from "./Components/admin/AdminNav";
import Login from "./Components/admin/Login";
import Items from "./Components/admin/Items";
import Page404 from "./Components/Page404";
import AddItem from './Components/admin/AddItem'
import EditItem from './Components/admin/EditItem'
const DefaultRoutes = () => (
  <div>
    <div>
      <Nav />
      <Route exact path="/" component={Enroll} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/product" component={Home} />
      <Route exact path="/home/wallets" component={Wallets} />
      <Footer />
    </div>
  </div>
);

const AdminRoutes = () => (
  <div>
    <AdminNav />
    <Route exact path="/admin/items" component={Items} />
    <Route exact path="/admin/items/add-item" component={AddItem} />
    <Route exact path="/admin/items/edit/:id" component={EditItem} />
    {/* <Route exact component={Page404} /> */}
  </div>
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Login} />
            <Route path="/admin/:section" component={AdminRoutes} />
            <Route component={DefaultRoutes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
