import React, { Component } from "react";
import axios from "axios";
export class EditTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        details: "",
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
          "/api/team/" +
          this.props.match.params.id
      )
      .then(team => {
        this.setState({
          data: {
            name: team.data.name,
            details: team.data.details,
            image: team.data.imgUrl
          },
          currentPicture: `http://localhost:8000/uploads/${team.data.imgUrl}`
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
          "/api/deleteteam/" +
          this.props.match.params.id
      )
      .then(resp => {
        this.props.history.goBack();
      });
  }
  submitHandler = e => {
    e.preventDefault();
    let formInfo = new FormData();
    formInfo.append("name", this.state.data.name);
    formInfo.append("details", this.state.data.details);
    formInfo.append("imgUrl", this.state.data.image);
    axios
      .put(
        process.env.REACT_APP_BACKEND +
          "/api/editteam/" +
          this.props.match.params.id,
        formInfo
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            name: "",
            details: "",
            image: null,
            message: "Team updated successfully.",
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
        <h3>Edit Team</h3>
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
          <label htmlFor="date">Image (jpg/png)</label> <br />
          {this.state.currentPicture && (
            <img
              src={this.state.currentPicture}
              alt="teamImg"
              width="100"
              height="100"
            />
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
            if (window.confirm("Are you sure you wish to delete this team?"))
              this.deleteHandler();
          }}
          className="btn btn-primary"
        >
          Delete Team
        </button>{" "}
        <br /> <br />
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

export default EditTeam;
