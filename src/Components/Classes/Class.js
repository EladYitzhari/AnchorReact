import React, { Component } from 'react';




class Class extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <tr>
                    <td>{this.props.obj.className}</td>
                    <td>{this.props.obj.isin}</td>
                    <td>{this.props.obj.type}</td>
                    <td>{this.props.obj.currency}</td>
                    <td>{this.props.obj.leverage}</td>
                    <td>{this.props.obj.feesType}</td>
                    <td>{this.props.obj.adminFee}</td>
                    <td>{this.props.obj.paetFee}</td>
                    <td>{this.props.obj.herdle}</td>
                    <td>{this.props.obj.cloStrategy}</td>
                    <td>{this.props.obj.distributing}</td>
      
                </tr>
        </React.Fragment>
         );
    }
}
 
export default Class;