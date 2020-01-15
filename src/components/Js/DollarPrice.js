import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as MovementsActions from '../../store/actions/MovementAction'
import dollarIcon from '../../images/Dollar-USD-icon.png'


class DollarPrice extends Component {
    state = {  }


    componentDidMount=()=>{
        this.props.getUSDFx();
    }


    render() { 
         
        return ( 
            <div style={{width:'100%',textAlign:'center'}}>
               <div style={{fontSize:'100%'}}>USD Last Price 
                <div style={{fontSize:'70%'}}>from BOI</div>
                <div>
                     {this.props.usdFx}
                     
                     <img style={{marginLeft:'8PX'}} src={dollarIcon} alt='dollarIcon' /></div>
                </div>
            </div>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
            usdFx: state.movements.usdFx
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        getUSDFx: () => dispatch(MovementsActions.getUSDFx())
    }
}


export default connect(mapStateToProp,mapDispatchToProps)(DollarPrice);