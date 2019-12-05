// import React from 'react';
import React, { Component } from 'react';
import Anchor from './Components/Anchor/Anchor'
import Chart from './Components/Research/Research'
import './App.css';
import { statement } from '@babel/template';
import { tsImportEqualsDeclaration } from '@babel/types';

class App extends Component {
  state = {  
    pageShow: 'test'
  } 
  render() { 
    return (  
      <div className="App">
      <h1>My first App</h1>
      <button onClick={() => this.navigateTo(<Anchor/>)}>Show Anchor Page</button>
       {this.state.pageShow}
        <Chart/>
     </div>
    );
  }


  navigateTo = (pageName) => {
    this.setState({
      pageShow: pageName
    }
    ) ;
  }


}
 
export default App;





