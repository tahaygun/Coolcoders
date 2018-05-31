import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../vendor/landingPage.css";
import axios from "axios";
import Footer from "./Footer";
axios.defaults.withCredentials = true;
//import { Redirect } from 'react-router-dom';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        couponCode: ""
      },
      errors: null,
      isloggedIn: true,
      wait:false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentWillMount() {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/isvalidcoupon")
      .then(response => {
        this.setState({ isloggedIn: true , wait:true });
      })
      .catch(err => {
        this.setState({ isloggedIn: false, wait:true });
      });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/homelogin", this.state.data)
      .then(response => {
        this.setState({ errors: "", isloggedIn: response.data.isloggedIn });
        this.props.history.push("/market");
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  }
  changeHandler(e) {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  }

  render() {
    var changeHandler = this.changeHandler;

    return (
      <div className='min-height' >
        <header className="masthead min-height text-center text-white d-flex">
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong>
                    Welcome to <span className="restart">Restart</span>.<span className="network">
                      NETWORK
                    </span>{" "}
                    Marketplace
                  </strong>
                </h1>
                <hr className='landing-hr' />
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">
                  Restart Marketplace is a market for RestartONE students which they can buy Restart.Network products by Restart.Network's own crypto currency OneCoin. <br/>
                  
                </p>
                {!this.state.isloggedIn && this.state.wait&& (
                  <div className="loginform">
                    <form onSubmit={this.submitHandler}>
                      {this.state.errors && (
                        <p className="text-danger">{this.state.errors}</p>
                      )}
                      <input
                        style={{ width: 300, margin: "auto" }}
                        type="couponCode"
                        value={this.state.data.couponCode}
                        name="couponCode"
                        onChange={changeHandler}
                        autoComplete="off"
                        className="form-control text-center"
                        id="couponCode"
                        aria-describedby="couponCode"
                        placeholder="Enter coupon code please.."
                      />
                      <br />
                      <button type="submit" className="btn btn-primary">
                        Enter
                      </button>
                    </form>
                  </div>
                )}

                {this.state.isloggedIn && this.state.wait && (
                  <Link
                    className="btn btn-primary btn-md js-scroll-trigger"
                    to="/market"
                  >
                    Go Marketplace
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>
        <Footer/>
      </div>
    );
  }
}

export default Home;
