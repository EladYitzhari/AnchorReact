import React, { Component } from 'react';
import * as selectAction  from '../../store/actions/SelectorAction'
import {connect} from 'react-redux';


class SelectCreator extends Component {
    
    state ={
        list: this.props.list
    }
    render() { 
        return ( 
            <select onChange={(e)=> this.props.ChangeSelectedValue(this.props.type,e.target.value)}>
                {this.state.list.map(o =>{
                    return(
                        <option key={o+this.props.type} value={o}>{o}</option>
                    )
                })}
            </select>
         );
    }
}


const mapDispatchToProps = dispatch =>
{
    return {
        ChangeSelectedValue: (selectorName,val) => dispatch(selectAction[selectorName](val))
    }
}


export default connect(null,mapDispatchToProps)(SelectCreator);