import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../vendor/landingPage.css';
export class Home extends Component {
  render() {
    return (
      <div>
        <header className="masthead text-center text-white d-flex">
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong>Welcome to <span className='restart'>Restart</span>.<span className='network' >NETWORK</span>  Marketplace</strong>
                </h1>
                <hr />
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">
                  Start Bootstrap can help you build better websites using the
                  Bootstrap CSS framework! Just download your template and start
                  going, no strings attached!
                </p>
                <Link
                  className="btn btn-primary btn-xl js-scroll-trigger"
                  to="/market"
                >
                  Go Marketplace
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
