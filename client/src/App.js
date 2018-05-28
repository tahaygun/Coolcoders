import React, { Component } from "react";
import "./App.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./vendor/simple-line-icons/css/simple-line-icons.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Wallets from './Components/Wallets'
import AdminNav from "./Components/admin/AdminNav";
import Login from "./Components/admin/Login";
import Dashboard from "./Components/admin/Dashboard";

const DefaultRoutes = () => (
  <div>
    <div>
      <Nav />
      <Route exact path="/product" component={Home} />
      <Route exact path="/wallets" component={Wallets} />
      <Footer />
    </div>
  </div>
);

const AdminRoutes = () => (
  <div>
    <AdminNav />
    <Route exact path="/admin" component={Login} />
    <Route exact path="/admin/items" component={Dashboard} />
  </div>
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/admin" component={AdminRoutes} />
            <Route exact path="/" component={Home} />
            <Route component={DefaultRoutes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
