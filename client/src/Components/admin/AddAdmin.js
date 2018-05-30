import React, { Component } from 'react'
import axios from 'axios'
export class AddAdmin extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           username:'',
           password:'',
           error: ''
        }
        this.formHandler = this.formHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
      
      formHandler(e){
          this.setState({
              [e.target.name]: e.target.value
          })
      }
      submitHandler(e){
          e.preventDefault();
          axios
          .post(process.env.REACT_APP_BACKEND + "/api/addadmin",this.state)
          .then(res=>{
            if (res.data.book) {
              this.setState({
                username:'',
                password:'',
                error: ''
              });
              setTimeout(()=>{ this.setState({message:null}); }, 3000);
            }
          })
          .catch(err=>{
            this.setState({error:'Unauthorized'})
          });
      }
  render() {
    return (
      <div className='content-wrapper container' >
      <h1>Add admin</h1><br/>
        <p> {this.state.error}</p>
        <p className='text-danger' >{this.state.message && this.state.message}</p>
        <form onSubmit={this.submitHandler}>
          
            <label htmlFor="username">Username</label> <br/>
            <input className="form-control" required value={this.state.username} autoComplete="off" type="text" name="username" onChange={this.formHandler} id="username"/>
            <hr/>
            <label htmlFor="username">Password</label> <br/>
            <input className="form-control" required value={this.state.password} autoComplete="off" type="text" name="password" onChange={this.formHandler} id="password"/>
            <hr/>
            
            <hr/>
            <button className='btn btn-primary' type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddAdmin