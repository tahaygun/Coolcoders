import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: "collapse navbar-collapse"
    };
    this.changeCollapse = this.changeCollapse.bind(this);
  }
  changeCollapse() {
    if (this.state.collapse === "collapse navbar-collapse") {
      return this.setState({ collapse: "collapse navbar-collapse show" });
    } else {
      return this.setState({ collapse: "collapse navbar-collapse" });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Restart Marketplace
          </Link>
          <button
            onClick={this.changeCollapse}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={this.state.collapse} id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  onClick={this.changeCollapse}
                  to="/"
                >
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  onClick={this.changeCollapse}
                  to="/market"
                >
                  Marketplace
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  onClick={this.changeCollapse}
                  to="/wallets"
                >
                  Wallets
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
