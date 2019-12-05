// import React from 'react';
import React, { Component } from 'react';

import Chart from './Exams/Research/Research'
import './App.css';
import { statement } from '@babel/template';
import { tsImportEqualsDeclaration } from '@babel/types';
import axios from 'axios';
import Home from './Components/Home/Home';

class App extends Component {

 


  state = {  
    pageShow: 'test'
  } 
  render() { 
    return (  
      <div className="App">
      
        <Home/>
        <Chart/>
     </div>
    );
  }


 


}
 
export default App;





