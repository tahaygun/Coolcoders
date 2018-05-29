import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: null
    };
  }
  deleteHandler(id) {
    axios
      .delete(process.env.REACT_APP_BACKEND + "/api/deleteteam/" + id)
      .then(resp => {
        this.getAllItems();

        // this.props.history.pageRefresh();
      });
  }
  getAllItems = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allteams`)
      .then(teams => {
        this.setState({ teams: teams.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.getAllItems();
  }
  render() {
    return this.state.teams ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Teams
                <Link
                  to="/admin/teams/add-team"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Team
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
                      <th style={{ width: "50%" }}>Description</th>

                      <th style={{ width: "8.33%" }}>Edit</th>
                      <th style={{ width: "8.33%" }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.teams.map((team, key) => {
                      return (
                        <tr key={key}>
                          <td>{team.name}</td>
                          <td>{team.details} </td>

                          <td>
                            <Link
                              to={"/admin/teams/edit-team/" + team._id}
                              className="btn btn-warning"
                            >
                              Edit
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                ) {
                                  this.deleteHandler(team._id);
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
      <h1>Loading</h1>
    );
  }
}

export default Teams;
