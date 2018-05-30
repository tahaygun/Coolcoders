import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

class UserWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: null
    };
  }
  getAllWallets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allwallets`)
      .then(wallets => {
        this.setState({ wallets: wallets.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getAllWallets();
  }

  render() {
    return this.state.wallets ? (
      <div className="container p-5 mt-5 min-height">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="display-4 shadow p-3 mb-5 bg-primary rounded">
           getAllWallets
            </h2>
          </div>
          {this.state.wallets.map((wallet, key) => {
            return (
              <div key={key} className="col-lg-4 col-sm-6 text-center mb-4">
                <div style={{minHeight:150}} >
                  <img
                    className="rounded-circle shadow img-fluid d-block mx-auto"
                    min-width="150px"
                    min-height="150px"
                    width="150px"
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${
                      wallet.imgUrl
                    }`}
                    alt="walletpic"
                  />
                </div>
                <h3>
                  {wallet.name} <br />
                  <small style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {wallet.coins} OneCoin
                  </small>
                </h3>
              
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default UserWallet;
