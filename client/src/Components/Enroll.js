import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
export default class Enroll extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        coupon_id:''
    
      },
      error:null,
      errors:null,
      isloggedIn:false
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  submitHandler(e){
    e.preventDefault();
    axios
    .post(process.env.REACT_APP_BACKEND + "/api/homelogin", this.state)
    .then(response => {
      this.props.history.push('/home')
    })
    .catch(err => {
      if (err) {
        this.setState({ error: err.response.data.errors });
      }
    });
}
  changeHandler(e){
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
        data : formData
    })

  }
    
  render() {
      var changeHandler= this.changeHandler;
    return (
      this.state.isloggedIn ? <Redirect to='/' /> :
      <div className='loginform'>
      
        {this.state.error && <p style={{color: 'red'}} >{this.state.error}</p> }
      <form onSubmit={this.submitHandler}>
                
                        <input type="coupon_id" value={this.state.data.coupon_id} name="coupon_id" onChange={changeHandler} className="form-control" id="coupon_id" aria-describedby="coupon_id" placeholder="Enter coupon"/>
                        {this.state.errors && this.state.errors.coupon_id && <p className='text-danger' >{this.state.errors.coupon_id.msg}</p>  }

            <button type="submit" className="btn btn-primary">Enter</button>
</form>
      </div>
    )
  }
}