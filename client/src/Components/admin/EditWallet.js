import React, { Component } from "react";
import axios from "axios";
export class EditTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        coins: ""
      },

      message: null,
      error: ""
    };
  }
  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/wallet/" +
          this.props.match.params.id
      )
      .then(wallet => {
        this.setState({
          data: {
            name: wallet.data.wallet.name,
            coins: wallet.data.wallet.coins
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
          "/api/editwallet/" +
          this.props.match.params.id,
        this.state.data
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            name: "",
            coins: "",
            message: "Wallet updated successfully.",
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
        <h3>Edit Wallet</h3>
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
          <br />
          <label htmlFor="name">Coins</label> <br />
          <input
            className="form-control"
            required
            style={{ width: "50vmax", margin: "auto" }}
            value={this.state.data.coins}
            autoComplete="off"
            type="number"
            name="coins"
            onChange={this.formHandler}
            id="coins"
          />
          <br />
         
          <hr />
          <button className="btn btn-warning" type="submit">
            Update
          </button>
        </form>{" "}
        <br />
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
