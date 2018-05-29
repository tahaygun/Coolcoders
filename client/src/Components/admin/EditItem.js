import React, { Component } from "react";
import axios from "axios";
export class EditItem extends Component {
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
      currentPicture: null,
      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/item/" +
          this.props.match.params.id
      )
      .then(item => {
        this.setState({
          data: {
            name: item.data.name,
            shortDesc: item.data.shortDesc,
            longDesc: item.data.longDesc,
            price: item.data.price,
            image: item.data.imgUrl
          },
          currentPicture: `http://localhost:8000/uploads/${item.data.imgUrl}`
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
  imageHandler = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];

      var formData = this.state.data;
      formData[event.target.name] = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          currentPicture: reader.result, // this is an image url
          data: formData
        });
      };

      reader.readAsDataURL(file);
    }
  };
  deleteHandler() {
    axios
    .delete(
      process.env.REACT_APP_BACKEND +
        "/api/deleteitem/" +
        this.props.match.params.id
    ).then(resp=>{
        this.props.history.goBack();
    })
  }
  submitHandler = e => {
    e.preventDefault();
    let formInfo = new FormData();
    formInfo.append("name", this.state.data.name);
    formInfo.append("shortDesc", this.state.data.shortDesc);
    formInfo.append("longDesc", this.state.data.longDesc);
    formInfo.append("price", this.state.data.price);
    formInfo.append("imgUrl", this.state.data.image);
    axios
      .put(
        process.env.REACT_APP_BACKEND +
          "/api/edititem/" +
          this.props.match.params.id,
        formInfo
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            name: "",
            shortDesc: "",
            longDesc: "",
            price: "",
            image: null,
            message: "Item updated successfully.",
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
        <h3>Edit Item</h3>
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
          <label htmlFor="date">Image (jpg/png)</label> <br />
          {this.state.currentPicture && (
            <img src={this.state.currentPicture} alt='itemImg' width="100" height="100" />
          )}
          <br />
          <input
            className="form-control"
            type="file"
            name="image"
            style={{ width: 300, margin: "auto" }}
            onChange={this.imageHandler}
            id="price"
          />{" "}
          <br />
          <hr />
          <button className="btn btn-warning" type="submit">
            Update
          </button>
        </form>{" "}
        <br />
        <button
          onClick={() => {
            if (window.confirm("Are you sure you wish to delete this item?"))
              this.deleteHandler();
          }}
          className="btn btn-primary"
        >
          Delete Item
        </button> <br/> <br/>
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

export default EditItem;
