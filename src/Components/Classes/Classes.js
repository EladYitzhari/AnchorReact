import React, { Component } from 'react';

import axios from 'axios'
import Class from './Class'
import 'bootstrap/dist/css/bootstrap.css'
import './Class.css'




class Classes extends Component {

    componentDidMount () {
        axios.get('http://localhost:8080/DataQ/Class/Classes')
          .then(response => {
            console.log(response.data);
            // const newClasses = response.data.filter(x => x.className.search("NIS") !== -1);
            const newClasses = response.data;
            this.setState({originalClasses : newClasses });
            this.setState({ dynamicClasses:  newClasses });
          });
    
          
        console.log("mount");
      }


    state = { 
        dynamicClasses : [],
        originalClasses: [],
        searchKey:'className'
     }
    render() { 
        return ( 
            <div>
                <input type="text" onChange={this.searchClasses} className=" inpClassSearch form-control"></input>

                <select onChange={this.setSearchKey}>
                  {this.state.originalClasses[0] && Object.keys(this.state.originalClasses[0]).filter(k => 
                  typeof this.state.originalClasses[0][k] == "string").map(k =>
                  {
                  return <option key={k} value={k}>{k}</option>
                  })}
                </select>

                <table className="table table-hover w-25">
                  {this.state.dynamicClasses.map(c => {return  <Class key={c.className} obj={c}/>}) }
                </table>
            </div>
         );
    }

    setSearchKey = (event) =>
    {
      this.setState({searchKey: event.target.value});
      console.log( typeof this.state.originalClasses[0][event.target.value]);
      this.setState({dynamicClasses: this.state.originalClasses});
      
    }

    searchClasses = (event) =>
    {
      const key = this.state.searchKey;
      
      const newClasses =   this.state.originalClasses.filter( x => x[key].toLowerCase().search(event.target.value.toLowerCase()) !== -1);
      this.setState({dynamicClasses: newClasses});
      
    }
}
 
export default Classes;