import React, { Component } from 'react';
import * as authActions from '../../store/actions/AuthAction'
import {connect} from 'react-redux';
import '../Css/Auth.css'

class Auth extends Component {
    state = { 
        email:'',
        password:''
     }

    formHandler =(e,key)=>{
        this.setState({[key]:e.target.value});
     }

    handleSubmit=(email,pass)=>{
        this.props.tryAuth(email,pass);
    }
    
    render() { 
        return ( 
            <div style={{width:'100%',textAlign:'center'}}>
            <div className="loginForm">
               
                    <input style={{width:'20%',textAlign:'center'}} onChange={(e)=>this.formHandler(e,'email')} type="email" placeholder="your email" />
                    <br />
                    <input style={{width:'20%',textAlign:'center'}} onChange={(e)=>this.formHandler(e,'password')} type="password" placeholder="password" />
                    <br />
                    <input className='btn login-submit'  type='submit' value='Login'  onClick={()=>this.handleSubmit(this.state.email,this.state.password)}/>
            </div>
            </div>
         );
    }
}
 



const mapDispatchToProps = dispatch =>
{
    return {
        tryAuth: (email,pass) => dispatch(authActions.tryAuth(email,pass))

    }
}
export default connect(null,mapDispatchToProps)(Auth);