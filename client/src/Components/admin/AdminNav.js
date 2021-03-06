import React, { Component } from "react";
import axios from "axios";
import { NavLink, withRouter } from "react-router-dom";
export class AdminNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: "collapse navbar-collapse"
    };
    this.changeCollapse = this.changeCollapse.bind(this);
  }
  logoutHandler = () => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/logout`).then(res => {
      this.props.history.push("/");
    });
  };
  changeCollapse() {
    if (this.state.collapse === "collapse navbar-collapse") {
      return this.setState({ collapse: "collapse navbar-collapse show" });
    } else {
      return this.setState({ collapse: "collapse navbar-collapse" });
    }
  }
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
          id="mainNav"
        >
          <NavLink className="navbar-brand text-white" to="/admin/items">
            Restart.Market
          </NavLink>
          <button
            onClick={this.changeCollapse}
            className="navbar-toggler navbar-toggler-right"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={this.state.collapse} id="navbarResponsive">
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
              <li className="nav-item">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/items"
                >
                  <i className="fa fa-fw  fa-table" />
                  <span className="nav-link-text"> Items</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/teams"
                >
                  <i className="fa fa-fw fa-flag" />
                  <span className="nav-link-text"> Teams</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/groups"
                >
                  <i className="fa fa-fw fa-group" />
                  <span className="nav-link-text"> Groups</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/wallets"
                >
                  <i className="fa fa-fw fa-bank" />
                  <span className="nav-link-text"> Wallets</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/wallet-management"
                >
                  <i className="fa fa-fw 	fa fa-cart-plus" />
                  <span className="nav-link-text"> Wallet Managements</span>
                </NavLink>
              </li>
              <li className="nav-item" title="Example Pages">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/requests"
                >
                  <i className="fa fa-fw fa-shopping-cart" />
                  <span className="nav-link-text"> Requests</span>
                </NavLink>
              </li>
              <li className="nav-item" title="Link">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/couponcodes"
                >
                  <i className="fa fa-fw fa-ticket" />
                  <span className="nav-link-text"> Coupon Codes</span>
                </NavLink>
              </li>
              <li className="nav-item" title="Link">
                <NavLink
                  onClick={this.changeCollapse}
                  className="nav-link"
                  activeClassName="text-white"
                  to="/admin/admins"
                >
                  <i className="fa fa-fw fa-cog" />
                  <span className="nav-link-text"> Options</span>
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  onClick={this.logoutHandler}
                  className="btn btn-success"
                >
                  <i className="fa fa-fw fa-sign-out " />Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(AdminNav);
