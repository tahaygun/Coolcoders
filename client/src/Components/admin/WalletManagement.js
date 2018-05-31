import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import JwPagination from "jw-react-pagination";
import Loading from "../Loading";
export class WalletManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: null,
      pageOfItems: []
    };
  }
  onChangePage = pageOfItems => {
    window.scrollTo(0, 0);
    this.setState({ pageOfItems });
  };
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
    const customLabels = {
      first: "<<",
      last: ">>",
      previous: "<",
      next: ">"
    };
    return this.state.history ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Cash History
                <Link
                  to="/admin/wallet-management/text-command"
                  className="btn btn-info m-1 float-right btn-sm"
                >
                  Text commands
                </Link>
                <Link
                  to="/admin/wallets/add-wallet"
                  className="btn btn-info float-right m-1 btn-sm"
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
                      <th style={{ width: "50%" }}>Event</th>
                      <th style={{ width: "50%" }}>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pageOfItems.map((history, key) => {
                      if (history.event.includes("added")) {
                        return (
                          <tr key={key}>
                            <td className="text-primary">{history.event}</td>
                            <td className="text-primary">{history.reason && history.reason}</td>
                          </tr>
                        );
                      } else if (history.event.includes("subtract")) {
                        return (
                          <tr key={key}>
                            <td className="text-danger">{history.event}</td>
                            <td className="text-danger">{history.reason &&history.reason}</td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr key={key}>
                            <td className="text-success">{history.event}</td>
                            <td className="text-success">{history.reason &&history.reason}</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <div className="pagination justify-content-center mb-4">
                {this.state.history.length && (
                  <JwPagination
                    items={this.state.history}
                    onChangePage={this.onChangePage}
                    disableDefaultStyles={true}
                    labels={customLabels}
                    pageSize={12}
                  />
                )}
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
