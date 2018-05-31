import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
export class WalletManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallets: null
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/walletHistory`)
      .then(history => {
        this.setState({ history: history.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return this.state.history ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Cash History
                <Link
                  to="/admin/wallet-management/text-command"
                  className="btn btn-info ml-1 float-right btn-sm"
                >
                  Text commands
                </Link>
                <Link
                  to="/admin/wallets/add-wallet"
                  className="btn btn-info float-right btn-sm"
                >
                  Voice Commands
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
                      <th style={{ width: "100%" }}>Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.history.map((history, key) => {
                      if (history.event.includes("added")) {
                        return (
                          <tr key={key}>
                            <td className="text-primary">{history.event}</td>
                          </tr>
                        );
                      } else if (history.event.includes("subtract")) {
                        return (
                          <tr key={key}>
                            <td className="text-danger">{history.event}</td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={key}>
                            <td className="text-success">{history.event}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default WalletManagement;
