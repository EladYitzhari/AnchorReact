import React from 'react';
import Header from './components/Js/header'
import './App.css';
import {BrowserRouter} from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter basename="/AnchorReact">
      <Header></Header>
    
    </BrowserRouter>
  );
}



export default App;
