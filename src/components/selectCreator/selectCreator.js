import React, { Component } from 'react';




class SelectCreator extends Component {
    
    state ={
        list: this.props.list
    }
    render() { 
        return ( 
            <select>
                {this.state.list.map(o =>{
                    return(
                        <option key={o+this.props.type} value={o}>{o}</option>
                    )
                })}
            </select>
         );
    }
}
 
export default SelectCreator;