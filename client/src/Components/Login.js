import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        teamID:'',
        password:''
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
    axios.post("/team/login", this.state.data).then((res)=>{
     console.log(res);
     if (res.data.errors) {
      return  this.setState({errors:res.data.errors})
     }
     if (res.data.error) {
      return  this.setState({error:res.data.message, errors:null})
     }
      return this.setState({isloggedIn:true});
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
      this.state.isloggedIn ? <Redirect to='/home' /> :
      <div className='loginform'>
        <h3>Login</h3>
        {this.state.error && <p style={{color: 'red'}} >{this.state.error}</p> }
      <form onSubmit={this.submitHandler}>
            <div className="form-group">
                        <label htmlFor="teamID">Team ID</label>
                        <input type="teamID" value={this.state.data.email} name="teamID" onChange={changeHandler} className="form-control" id="teamID" aria-describedby="ID" placeholder="Enter ID"/>
                        {this.state.errors && this.state.errors.teamID && <p className='text-danger' >{this.state.errors.teamID.msg}</p>  }

            </div>
            <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={changeHandler} value={this.state.data.password} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                        {this.state.errors && this.state.errors.password && <p className='text-danger' >{this.state.errors.password.msg}</p>  }
                        
            </div>
            <button type="submit" className="btn btn-primary">Enter</button>
</form>
      </div>
    )
  }
}