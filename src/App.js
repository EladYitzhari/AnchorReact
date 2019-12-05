// import React from 'react';
import React, { Component } from 'react';
import Anchor from './Components/Anchor/Anchor'
import Chart from './Exams/Research/Research'
import './App.css';
import { statement } from '@babel/template';
import { tsImportEqualsDeclaration } from '@babel/types';
import axios from 'axios';

class App extends Component {

  componentDidMount () {
    axios.get('http://localhost:8080/DataQ/IsinRow/IsinRows')
      .then(response => {
        console.log(response.data);
      }

      );
    console.log("mount");
  }


  state = {  
    pageShow: 'test'
  } 
  render() { 
    return (  
      <div className="App">
      <h1>My first App</h1>
      
        <Chart/>
     </div>
    );
  }


 


}
 
export default App;





