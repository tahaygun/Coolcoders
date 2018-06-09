import React, { Component } from "react";
import axios from "axios";
import Loading from "./Loading";
export class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: "",
        description: "",
        image: null
      },
      item: null,
      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/itembySeqId/" +
          this.props.match.params.id
      )
      .then(item => {
        this.setState({ item: item.data });
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
    var formData = this.state.data;
    formData[event.target.name] = event.target.files[0];
    this.setState({ data: formData });
  };
  submitHandler = e => {
    e.preventDefault();
    let formInfo = new FormData();
    formInfo.append("title", this.state.data.title);
    formInfo.append("description", this.state.data.description);
    formInfo.append("proofImg", this.state.data.image);
    formInfo.append("item", this.state.item._id);
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/addrequest", formInfo)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              title: "",
              description: "",
              image: null
            },
            message: "Request sent successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Please fill all fields!" });
      });
  };
  render() {
    return this.state.item ? (
      <div className="text-center mt-5 min-height container">
        <h3>Order {this.state.item.name} </h3>
        <img
          className="rounded-circle img-fluid d-block mx-auto"
          min-width="150px"
          width="150px"
          src={`${process.env.REACT_APP_BACKEND}/uploads/${
            this.state.item.imgUrl
          }`}
          alt="itempic"
        />
        <br /> <br />
        <p> {this.state.error}</p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Group Name</label> <br />
          <input
            style={{ width: "40vw", margin: "auto" }}
            className="shadow rounded form-control"
            required
            value={this.state.data.title}
            autoComplete="off"
            type="text"
            name="title"
            onChange={this.formHandler}
            id="title"
          />
          <br /> <br />
          <label htmlFor="content">Description</label>
          <textarea
            className="shadow rounded form-control"
            required
            id="textarea"
            value={this.state.data.description}
            style={{ height: 70, width: "40vw", margin: "auto" }}
            type="text"
            name="description"
            onChange={this.formHandler}
          />
          <br /> <br />
          <div className="upload-btn-wrapper">
          <button className="btn-sss">Upload a file</button>
          <input
            style={{ width: "235px", margin: "auto", textAlign: "center" }}
            className="shadow rounded form-control"
            type="file"
            name="image"
            onChange={this.imageHandler}
            id="price"
          />
          </div>
          <br/>
          <br />
          <button className="btn m-2 btn-primary" type="submit">
            Order
          </button>
          <button
          onClick={() => {
            this.props.history.goBack();
          }}
          className="btn m-2 btn-info"
        >
          Go Back
        </button>
        </form>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default OrderItem;
