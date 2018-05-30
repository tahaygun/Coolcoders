import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null
    };
  }
  getAllItems = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/allitems`)
      .then(items => {
        this.setState({ items: items.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteHandler(id) {
    axios
      .delete(process.env.REACT_APP_BACKEND + "/api/deleteitem/" + id)
      .then(resp => {
        this.getAllItems();
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getAllItems();
  }

  render() {
    return this.state.items ? (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mb-3">
            <div className="card-header">
              <div>
                <i className="fa fa-table" /> Items
                <Link
                  to="/admin/items/add-item"
                  className="btn btn-info float-right btn-sm"
                >
                  Add New Item
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
                      <th style={{ width: "50%" }}>Short Description</th>
                      <th style={{ width: " 5%" }}>Price</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                      <th style={{ width: "8.33%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item.name}</td>
                          <td>{item.shortDesc} </td>
                          <td>{item.price}</td>
                          <td>
                            <Link
                              to={"/admin/items/edit/" + item._id}
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
                                  this.deleteHandler.bind(null, item._id);
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

export default Items;
