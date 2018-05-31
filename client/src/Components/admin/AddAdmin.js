import React, { Component } from "react";
import axios from "axios";

export class AddCoupon extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: {
          username: "",
          password: ""
          
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

    submitHandler = e => {
      e.preventDefault();   
      axios
        .post(process.env.REACT_APP_BACKEND + "/api/addadmin", this.state.data)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              data: {
                username: "",
                password: ""
                
              },
              message: "Admin added successfully.",
              error: ""
            });
          }
        })
        .catch(err => {
          this.setState({ error: " The field is empty!" });
        });
    };
    render() {
      return (
        <div className="content-wrapper text-center container">
          <h3>Add Admin</h3>
          <br />
          <p> {this.state.error}</p>
          <p className="text-danger">
            {this.state.message && this.state.message}
          </p>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="couponCode">Coupon Code</label> <br />
            <input
              style={{ width: "50vmax", margin: "auto" }}
              className="form-control"
              required
              value={this.state.data.name}
              autoComplete="off"
              type="text"
              name="couponCode"
              onChange={this.formHandler}
              id="couponCode"
            />
            <br/>            
            <br />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
      );
    }
  }
  
  export default AddCoupon;
  