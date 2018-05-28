import React, { Component } from 'react'
import axios from 'axios'
export class AddItem extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           title:'',
           content:'',
           date:'',
           book:'',
           booklist:[],
           message:null,
           error:'',
        }
        this.formHandler = this.formHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        axios.get(process.env.REACT_APP_SECRET_CODE + "/api/allbooks").then(res=>this.setState({booklist:res.data})).catch(err=>console.log(err));
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
          .post(process.env.REACT_APP_SECRET_CODE + "/api/addsection",this.state)
          .then(res=>{
            if (res.data.book) {
              this.setState({
                title:'',
                content:'',
                date:'',
                message:"Bölüm eklendi!"
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
          
            <label htmlFor="title">Başlık</label> <br/>
            <input className="form-control" required value={this.state.title} autoComplete="off" type="text" name="title" onChange={this.formHandler} id="title"/>
            <hr/>
            <label htmlFor="content">İçerik</label><br/>
            <textarea className="form-control" required id='textarea'  value={this.state.content}  style={{height:200}} type="text" name="content" onChange={this.formHandler} />
            <hr/>
            <label  htmlFor="date">Extra Bilgi</label><br/>
            <input className="form-control" type="text"  value={this.state.date} autoComplete="off" name="date" onChange={this.formHandler} id="date"/> <br/>
            <hr/>
            <button className='btn btn-primary' type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddItem
