import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

export class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: null
    };
  }

  deleteHandler(id) {
    axios
    .delete(process.env.REACT_APP_BACKEND + "/api/deletegroup/" + id)
      .then(resp => {
        this.getAllGroups();

        // this.props.history.pageRefresh();
      });
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allgroups`)
      .then(groups => {
        this.setState({ groups: groups.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return this.state.groups ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Groups
                <Link
                  to="/admin/groups/add-group"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Group
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
                      <th style={{ width: "50%" }}>Team</th>
                    
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.groups.map((group,key) => {
                      return (
                        <tr key={key} >
                          <td>{group.name}</td>
                          <td>{group.team.name} </td>
                          
                          <td>
                            <Link to={`/admin/groups/edit-group/${group._id}`} className="btn btn-warning">Edit</Link>
                          </td>
                          <td>
                          <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this coupon?"
                                  )
                                ) {
                                  this.deleteHandler(group._id);
                                }
                              }}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
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
      <Loading/>
    );
  }
}

export default Groups;