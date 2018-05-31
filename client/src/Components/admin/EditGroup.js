import React, { Component } from "react";
import axios from "axios";
export class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: ""
      },

      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/group/" +
          this.props.match.params.id
      )
      .then(group => {
        this.setState({
          data: {
            name: group.data.name
          }
        });
      });
  }
  formHandler = e => {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .put(
        process.env.REACT_APP_BACKEND +
          "/api/editgroup/" +
          this.props.match.params.id,
        this.state.data
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            name: "",
            message: "Group updated successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Something went wrong!" });
      });
  };
  render() {
    return (
      <div className="content-wrapper text-center container">
        <h3>Edit Group</h3>
        <br />
        <p> {this.state.error}</p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="name">Name</label> <br />
          <input
            className="form-control"
            required
            style={{ width: "50vmax", margin: "auto" }}
            value={this.state.data.name}
            autoComplete="off"
            type="text"
            name="name"
            onChange={this.formHandler}
            id="name"
          />
          <hr />
          <button className="btn btn-warning" type="submit">
            Update
          </button>
        </form>{" "}
        <br />
        <button
          onClick={() => {
            this.props.history.goBack();
          }}
          className="btn btn-info"
        >
          Go Back
        </button>
      </div>
    );
  }
}

export default EditGroup;
