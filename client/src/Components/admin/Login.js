import React, { Component } from "react";
import "../../vendor/sb-admin.css";
import axios from "axios";
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: ""
    };
    this.formHandler = this.formHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  formHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_BACKEND + "/api/adminlogin", this.state)
      .then(response => {
        this.props.history.push('/admin/items')
      })
      .catch(err => {
        if (err) {
          this.setState({ error: err.response.data.errors });
        }
      });
  }
  render() {
    return (
      <div className="container min-height">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={this.submitHandler}>
              <div className="form-group">
                {this.state.error.logError && (
                  <p className="text-danger">{this.state.error.logError}</p>
                )}
                <label htmlFor="email">Username</label>
                <input
                  onChange={this.formHandler}
                  className="form-control"
                  id="email"
                  name="username"
                  type="text"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                  value={this.state.email}
                />
                {this.state.error.username && (
                  <p className="text-danger">{this.state.error.username.msg}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  value={this.state.password}
                  onChange={this.formHandler}
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                {this.state.error.password && (
                  <p className="text-danger">{this.state.error.password.msg}</p>
                )}
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
