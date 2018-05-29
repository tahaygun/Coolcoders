import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
export class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allrequests`)
      .then(requests => {
        this.setState({ requests: requests.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return this.state.requests ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Requests
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
                      <th style={{ width: "30%" }}>Title</th>
                      <th style={{ width: "50%" }}> Description</th>
                      <th style={{ width: " 5%" }}>Image</th>
                      <th style={{ width: " 10%" }}>Item</th>
                      <th style={{ width: " 10%" }}>Status</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.requests.map((request,key) => {
                      return (
                        <tr key={key} >
                          <td>{request.title}</td>
                          <td>{request.description} </td>
                          <td>{request.proofImg}</td>
                          <td>{request.item.id}</td>
                          <td>{request.status}</td>
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

export default Requests;
