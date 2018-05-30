import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
export class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null
    };
  }
  acceptHandler = id => {
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/acceptRequest/${id}`)
      .then(answer => {
        this.getRequests();
      });
  };
  rejectHandler = id => {
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/rejectRequest/${id}`)
      .then(answer => {
        this.getRequests();
      });
  };
  deleteHandler = id => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/deleteRequest/${id}`)
      .then(answer => {
        this.getRequests();
      });
  };
  getRequests = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allrequests`)
      .then(requests => {
        this.setState({ requests: requests.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getRequests();
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
                      <th style={{ width: "40%" }}> Description</th>
                      <th style={{ width: " 5%" }}>Proof</th>
                      <th style={{ width: " 10%" }}>Item</th>
                      <th style={{ width: " 5%" }}>Status</th>
                      <th style={{ width: "26.66%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.requests.map((request, key) => {
                      return (
                        <tr key={key}>
                          <td>{request.title}</td>
                          <td>{request.description} </td>
                          <td>
                            {" "}
                            <a
                              target="_blank"
                              href={
                                process.env.REACT_APP_BACKEND +
                                "/uploads/" +
                                request.proofImg
                              }
                            >
                              {" "}
                              <img
                                width="70"
                                src={
                                  process.env.REACT_APP_BACKEND +
                                  "/uploads/" +
                                  request.proofImg
                                }
                                alt="proofPicture"
                              />{" "}
                            </a>{" "}
                          </td>
                          <td><Link className='text-info' to={`/item/details/${request.item.seqId}`} > {request.item.name}</Link> </td>
                          <td>{request.status}</td>
                          {request.status === "Pending" ? (
                            <td className="actionButtonsTogether">
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you wish to accept this request?")) {this.acceptHandler(request._id)}}}
                                className="btn btn-warning"
                              >
                                Accept
                              </button>{" "}
                              <br /> <br />
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you wish to reject this request?")) {
                                    this.rejectHandler(request._id);
                                  }
                                }}
                                className="btn btn-danger"
                              >
                                Reject
                              </button>
                            </td>
                          ) : (
                            <td className="actionButtonsTogether">
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you wish to delete this item?")) {
                                    this.deleteHandler(request._id);
                                  }
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          )}
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
