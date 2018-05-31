import React, { Component } from "react";
import axios from "axios";
export class EditTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        group: "",
        team: "",
        coins: ""
      },
      
      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND +
          "/api/wallet/" +
          this.props.match.params.id
      )
      .then(wallet => {
        this.setState({
          data: {
            name: team.data.name,
            group: team.data.group,
            team: team.data.team,
            coins: team.data.coins
          },
          
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
 
  deleteHandler() {
    axios
      .delete(
        process.env.REACT_APP_BACKEND +
          "/api/deletewallet/" +
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
    formInfo.append("group", this.state.data.group);
    formInfo.append("team", this.state.data.team);
    formInfo.append("coins", this.state.data.coins);
    
    axios
      .put(
        process.env.REACT_APP_BACKEND +
          "/api/editwallet/" +
          this.props.match.params.id,
        formInfo
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            name: "",
            group: "",
            team: "",
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
          <hr />
          <label htmlFor="content">Group</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.group}
            style={{ height: 70, width: "50vmax", margin: "auto" }}
            type="text"
            name="details"
            onChange={this.formHandler}
          />
          <hr />
          <label htmlFor="content">Team</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.team}
            style={{ height: 70, width: "50vmax", margin: "auto" }}
            type="text"
            name="team"
            onChange={this.formHandler}
          />
          <hr />

           <label htmlFor="content">Coins</label>
          <br />
          <textarea
            className="form-control"
            required
            id="textarea"
            value={this.state.data.coins}
            style={{ height: 70, width: "50vmax", margin: "auto" }}
            type="text"
            name="coins"
            onChange={this.formHandler}
          />
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
