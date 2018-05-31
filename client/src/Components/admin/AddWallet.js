import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading";
export class AddWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        group: "",
        coins:0
      },
      groups:null,
      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/allgroups")
      .then(groups => {
        this.setState({ groups: groups.data });
      })
      .catch(err => console.log(err));
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
      .post(process.env.REACT_APP_BACKEND + "/api/addwallet", this.state.data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              name: "",
              group: "",
              coins:0
            },
            message: "Wallet added successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Please fill all fields!" });
      });
  };
  render() {
    return this.state.groups ? (
      <div className="content-wrapper text-center container">
        <h3>Add Wallet</h3>
        <br />
        <p className="text-danger"> {this.state.error}</p>
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
          <br/>
          <label htmlFor="coins">Starting Coins</label> <br />
          <input
            style={{ width: "50vmax", margin: "auto" }}
            className="form-control"
            required
            value={this.state.data.coins}
            autoComplete="off"
            type="text"
            name="coins"
            onChange={this.formHandler}
            id="coins"
          /> <br/>
          <label htmlFor="group">Group</label> <br />
          <select
            className="form-control"
            style={{ width: "50vmax", margin: "auto" }}
            onChange={this.formHandler}
            name="group"
            id="group"
          >
          <option value=''>Select Group</option>;
            {this.state.groups.map(group => {
              return <option key={group._id} value={group._id}>{group.name} </option>;
            })}
          </select>
          <hr />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
        <br/>
        <button
          onClick={() => {
            this.props.history.goBack();
          }}
          className="btn btn-info"
        >
          Go Back
        </button>
      </div>
    ) : (
      <Loading />
    );
  }
}

export default AddWallet;
