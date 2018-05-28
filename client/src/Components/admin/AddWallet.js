import React, { Component } from 'react'
import axios from 'axios'
export class AddWallet extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           name:'',
           group:'',
           coins:'',
           error: ''
        }
        this.formHandler = this.formHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        axios.get(process.env.REACT_APP_SECRET_CODE + "/api/allwallets").then(res=>this.setState({wallets:res.data})).catch(err=>console.log(err));
        axios
        .post(
          process.env.REACT_APP_SECRET_CODE +
            "/api/isloggedin").then(res => {
          this.setState({ auth: true });
        })
        .catch(err => this.setState({ auth: false }));
        
    }
      
      formHandler(e){
          this.setState({
              [e.target.name]: e.target.value
          })
      }
      submitHandler(e){
          e.preventDefault();
          axios
          .post(process.env.REACT_APP_SECRET_CODE + "/api/addwallet",this.state)
          .then(res=>{
            if (res.data.book) {
              this.setState({
                name:'',
                group:'',
                coins:'',
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
      <h1>Bölüm ekle</h1><br/>
        <p> {this.state.error}</p>
        <p className='text-danger' >{this.state.message && this.state.message}</p>
        <form onSubmit={this.submitHandler}>
          
            <label htmlFor="name">name</label> <br/>
            <input className="form-control" required value={this.state.name} autoComplete="off" type="text" name="name" onChange={this.formHandler} id="name"/>
            <hr/>
            <label htmlFor="content">Group</label><br/>
            <textarea className="form-control" required id='textarea'  value={this.state.group}  style={{height:200}} type="text" name="group" onChange={this.formHandler} />
            <hr/>
            <label  htmlFor="date">Coins</label><br/>
            <input className="form-control" type="text"  value={this.state.coins} autoComplete="off" name="coins" onChange={this.formHandler} id="coins"/> <br/>
            <hr/>
            <button className='btn btn-primary' type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddWallet
