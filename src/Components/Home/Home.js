import React, { Component } from 'react';
import './Home.css'
import logo from '../../imgs/image.png'
import Classes from '../Classes/Classes'



class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="mainDivHome">
                <h1> Home page</h1>
                <img src={logo} />
                <Classes></Classes>
            </div>
         );
    }
}
 
export default Home;