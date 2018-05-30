import React, { Component } from "react";
import axios from "axios";

export class AddCoupon extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: {
          coupon_id: "",
          
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
      formInfo.append("coupon_id", this.state.data.coupon_id);
   
      axios
        .post(process.env.REACT_APP_BACKEND + "/api/addcoupon", formInfo)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              data: {
                coupon_id: "",
                
              },
              message: "Coupon added successfully.",
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
          <h3>Add Coupon</h3>
          <br />
          <p> {this.state.error}</p>
          <p className="text-danger">
            {this.state.message && this.state.message}
          </p>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="coupon_id">Coupon</label> <br />
            <input
              style={{ width: "50vmax", margin: "auto" }}
              className="form-control"
              required
              value={this.state.data.name}
              autoComplete="off"
              type="number"
              name="coupon_id"
              onChange={this.formHandler}
              id="coupon_id"
            />
            <hr />
            
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
  
  export default AddCoupon;
  