import React, { Component } from "react";
import axios from "axios";
export class AddTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        details: "",
        image: null
      },
      message: null,
      error: ""
    };
  }

  formHandler = e => {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  };
  imageHandler = event => {
    var formData = this.state.data;
    formData[event.target.name] = event.target.files[0];
    this.setState({ data: formData });
  };
  submitHandler = e => {
    e.preventDefault();
    let formInfo = new FormData();
    formInfo.append("name", this.state.data.name);
    formInfo.append("details", this.state.data.details);
    formInfo.append("imgUrl", this.state.data.image);
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/addteam", formInfo)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              name: "",
              details: "",
              image: null
            },
            message: "Team added successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Please fill all fields!" });
      });
  };
  render() {
    return (
      <div className="content-wrapper text-center container">
        <h3>Add Team</h3>
        <br />
        <p> {this.state.error}</p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="name">Name</label> <br />
          <input
            style={{ width: "50vmax", margin: "auto" }}
            className="form-control"
            required
            value={this.state.data.name}
            autoComplete="off"
            type="text"
            name="name"
            onChange={this.formHandler}
            id="name"
          />
          <hr />
          <label htmlFor="content">Details</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.details}
            style={{ height: 70, width: "50vmax", margin: "auto" }}
            type="text"
            name="details"
            onChange={this.formHandler}
          />
          <hr />
          <label htmlFor="date">Image (jpg/png)</label>
          <br />
          <input
            style={{ width: "20vmax", margin: "auto", textAlign:'center' }}
            className="form-control"
            type="file"
            name="image"
            onChange={this.imageHandler}
            id="price"
          />{" "}
          <br />
          <hr />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default AddTeam;
