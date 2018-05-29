import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../vendor/landingPage.css';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';
export class Home extends Component {
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
      this.props.history.push('/')
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

<div>
    
        <header className="masthead text-center text-white d-flex"> 
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong>Welcome to <span className='restart'>Restart</span>.<span className='network' >NETWORK</span>  Marketplace</strong>
                </h1>
                <hr />
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">
                  Start Bootstrap can help you build better websites using the
                  Bootstrap CSS framework! Just download your template and start
                  going, no strings attached!
                </p>
      <div className='loginform'>
      
        {this.state.error && <p style={{color: 'red'}} >{this.state.error}</p> }
      <form onSubmit={this.submitHandler}>
                
                        <input type="coupon_id" value={this.state.data.coupon_id} name="coupon_id" onChange={changeHandler} className="form-control" id="coupon_id" aria-describedby="coupon_id" placeholder="Enter coupon"/>
                        {this.state.errors && this.state.errors.coupon_id && <p className='text-danger' >{this.state.errors.coupon_id.msg}</p>  }

            <button type="submit" className="btn btn-primary">Enter</button>
</form>
      </div>
     
{this.state.isloggedIn && 


                <Link
                  className="btn btn-primary btn-xl js-scroll-trigger"
                  to="/market"
                >
                  Go Marketplace
                </Link>
}
              </div>
            </div>
          </div>


        </header>
      </div>
    
    );
  }
}


export default Home;