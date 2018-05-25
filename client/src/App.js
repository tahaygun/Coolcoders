import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            {/* <Nav /> */}
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
