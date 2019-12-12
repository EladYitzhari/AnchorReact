import React, { Component } from 'react';
import './ClassTable.css'
import { CHANGE_PORTFOLIO_NAME } from '../../store/actionTypes';
import { number } from 'prop-types';



class ClassTable extends Component {
    state = { 
        
     }

    isHTMLeverage = (c) =>
    {
        return c.cloStrategy === 'HTM' && c.leverage ==="Yes";
    }
    isHTM = (c) =>
    {
        return c.cloStrategy === 'HTM' && c.leverage ==="No";
    }
    isActive = (c) =>
    {
        return c.cloStrategy === 'AFS';
    }

    checkPortfolio =(portfolioName) =>
    {
        switch(portfolioName){
            case 'HTM-Leverage':
                {
                   return this.props.classes.filter(this.isHTMLeverage);
                }
            case 'HTM':
                    {
                        return this.props.classes.filter(this.isHTM);
                    }
            case 'Active':
                    {
                        return this.props.classes.filter(this.isActive);
                    }
        }
        return this.props.classes.filter(this.isHTMLeverage);
    }
    
    render() { 
        return ( 
            <table id="classTable" className="table table-hover classesTable">
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Isin</th>
                    <th>Type</th>
                    <th>Currency</th>
                    <th>Distributing</th>
                    <th>Clo Strategy</th>
                    <th>Leverage</th>
                    <th>Fees Type</th>
                    <th>Admin Fee</th>
                    <th>Part Fee</th>
                    <th>Herdle</th>
                </tr>
            </thead>
            <tbody>
                {this.checkPortfolio(this.props.portfolioName).map(c=>{
                    return (
                        <tr key={c['className']}>
                            <td>{c['className']}</td>
                            <td>{c['isin']}</td>
                            <td>{c['type']}</td>
                            <td>{c['currency']}</td>
                            <td>{c['distributing']}</td>
                            <td>{c['cloStrategy']}</td>
                            <td>{c['leverage']}</td>
                            <td>{c['feesType']}</td>
                            <td>{Number(c['adminFee']*100).toFixed(2)+"%"}</td>
                            <td>{Number(c['paetFee']*100).toFixed(0)+"%"}</td>
                            <td>{Number(c['herdle']*100).toFixed(0)+"%"}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
         );
    }
}
 
export default ClassTable;