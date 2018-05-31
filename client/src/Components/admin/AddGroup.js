import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading";
export class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        team: ""
      },
      message: null,
      error: ""
    };
  }
  componentWillMount() {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/allteams")
      .then(teams => {
        this.setState({ teams: teams.data });
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
      .post(process.env.REACT_APP_BACKEND + "/api/addgroup", this.state.data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              name: "",
              team: ""
            },
            message: "Group added successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Please fill all fields!" });
      });
  };
  render() {
    return this.state.teams ? (
      <div className="content-wrapper text-center container">
        <h3>Add Group</h3>
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
          <hr />
          <label htmlFor="team">Team</label> <br />
          <select
            className="form-control"
            style={{ width: "50vmax", margin: "auto" }}
            onChange={this.formHandler}
            name="team"
            id="team"
          >
            <option value="">Select Team</option>;
            {this.state.teams.map((team,key) => {
              return <option key={key} value={team._id}>{team.name} </option>;
            })}
          </select>
          <hr />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
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
    ) : (
      <Loading />
    );
  }
}

export default AddGroup;
