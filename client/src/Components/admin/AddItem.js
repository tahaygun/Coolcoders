import React, { Component } from "react";
import axios from "axios";
export class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        shortDesc: "",
        longDesc: "",
        price: "",
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
    formInfo.append("shortDesc", this.state.data.shortDesc);
    formInfo.append("longDesc", this.state.data.longDesc);
    formInfo.append("price", this.state.data.price);
    formInfo.append("imgUrl", this.state.data.image);
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/additem", formInfo)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              name: "",
              shortDesc: "",
              longDesc: "",
              price: "",
              image: null
            },
            message: "Item added successfully.",
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
      <div className="content-wrapper container">
        <h3>Add Item</h3>
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
            value={this.state.data.name}
            autoComplete="off"
            type="text"
            name="name"
            onChange={this.formHandler}
            id="name"
          />
          <hr />
          <label htmlFor="content">Short Description</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.shortDesc}
            style={{ height: 70 }}
            type="text"
            name="shortDesc"
            onChange={this.formHandler}
          />
          <hr />
          <label htmlFor="content">Long Description</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.longDesc}
            style={{ height: 150 }}
            type="text"
            name="longDesc"
            onChange={this.formHandler}
          />
          <hr />
          <label htmlFor="date">Price</label>
          <br />
          <input
            className="form-control"
            type="number"
            value={this.state.data.price}
            autoComplete="off"
            name="price"
            onChange={this.formHandler}
            id="price"
          />{" "}
          <br />
          <hr />
          <label htmlFor="date">Image (jpg/png)</label>
          <br />
          <input
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

export default AddItem;
