import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export class Wallets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallets: null
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allwallets`)
      .then(wallets => {
        this.setState({ wallets: wallets.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return this.state.wallets ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Wallets
                <Link
                  to="/admin/wallets/add-wallet"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Wallet
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "50%" }}>Group</th>
                      <th style={{ width: " 5%" }}>Coins</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.wallets.map((wallet,key) => {
                      return (
                        <tr key={key} >
                          <td>{wallet.name}</td>
                          <td>{wallet.group} </td>
                          <td>{wallet.coins}</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                          </td>
                          <td>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default Wallets;
