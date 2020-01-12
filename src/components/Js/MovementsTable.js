import React, { Component } from 'react';
import '../Css/MovementsTable.css';
import GeneralChart from '../Js/GeneralChart'
import * as globFun from '../Functions/globalFunction';

class MovemetsTable extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
            <table id={this.props.id} className="movementsTable table table-hover">
                <thead>
                    <tr>
                        <th>FundSettle Id</th>
                        <th>Isin</th>
                        <th>Class Name</th>
                        <th>Order Date</th>
                        <th>Effective Date</th>
                        <th>Type</th>
                        <th>Quantity-Shares</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.movements.map((m,index)=>{
                        return (
                            <tr key={index+"movementTableRow"}>
                                <td>{m.fundSettleId}</td>
                                <td>{m.isin}</td>
                                <td>{m.className}</td>
                                <td>{m.orderDate}</td>
                                <td>{m.effectiveDate}</td>
                                <td>{m.type}</td>
                                <td>{m.quantity}</td>
                                <td>{m.originalCurrency}</td>
                                <td>{m.amount}</td>
                                <td>{m.details}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div id='chartMovementsDiv'>
                <GeneralChart chartType="Bar" chrtTableId='TopChartTable' width={'1300'} height={'500'}
                array={this.props.movements}
                rowFiledName={'className'}
                rowsHeaders={globFun.uniqArrayFromTable(this.props.movements,'className')}
                columnFileName={'effectiveDate'}
                columnHeaders={globFun.uniqArrayFromTable(this.props.movements,'effectiveDate')}
                value={'quantity'} 
                averageStatus={'no'} 
                averageByField={'quantity'} />

            </div>  
            </React.Fragment>
            
         );
    }
}
 
export default MovemetsTable;