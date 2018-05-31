import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";

function Wallet(props) {
  return (
    <div className="col-lg-4 col-sm-6 text-center mb-4">
      <div style={{ minHeight: 150 }}>
        <img
          className=" shadow img-fluid d-block mx-auto"
          min-width="150px"
          min-height="150px"
          width="150px"
          src={`${process.env.REACT_APP_BACKEND}/uploads/${
            props.wallet.team.imgUrl
          }`}
          alt="walletpic"
        />
      </div>
      <h3>
        {props.wallet.name} <br />
        <small style={{ fontSize: "22px", color: "red", fontWeight: "bold" }}>
          {props.wallet.coins} OneCoin
        </small>
      </h3>
    </div>
  );
}
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
            <p className="display-4 headersOnUI shadow p-3 mb-5">
              Wallets
            </p>
          </div>
          {this.state.wallets.map((wallet, key) => {
            return (
                <Wallet wallet={wallet} key={key} />
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
