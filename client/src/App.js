import React, { Component } from "react";
import "./App.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./vendor/simple-line-icons/css/simple-line-icons.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            {/* <Nav /> */}
            <Switch>{/* <Route exact path="/" component={Home} /> */}</Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
