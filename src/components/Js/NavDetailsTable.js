import React, { Component } from 'react';
import '../Css/NavDetailsTable.css'
import {connect} from 'react-redux';


class NavDetails extends Component {
    state = {  }
    render() { 
        return ( 
            <table id="calculateNavTable" className="table">
            <tr  className="table-primary">
                <td>Section</td>
                <td style={{textAlign: 'center'}}>$</td>
                <td style={{textAlign: 'center'}}>%</td>
            </tr>	
            <tr>
                <td>Total Assets – All the Anchor fund</td>
                <td id="AllAnchorAssetsTd" className='numTd'></td>
                <td></td>
            </tr> 
            <tr>
                <td>Total Assets – Amortized Cost</td>
                <td id="totalAssetsTd" className='numTd'></td>
                <td></td>
            </tr>
            <tr>
                <td>Lev Interest</td>
                <td id="LevInterestTd" className='numTd'></td>
                <td></td>
            </tr>
            <tr>
                <td>Accrued Interest</td>
                <td id="AccruedInterestTd" className='numTd'></td>
                <td></td>
            </tr>	
            <tr>
                <td>Gross Interest</td>
                <td id="GrossInterestTd" className='numTd'></td>
                <td></td>
            </tr>

            <tr  className="table-primary">
                <td>Operational Costs</td>
                <td></td>
                <td></td>
            </tr>	 

            <tr>
                <td>CSAM Fee</td>
                <td id="CSAMFeeTd" className='numTd'></td>
                <td></td>
            </tr>
            <tr>
                <td>Tzur Fees </td>
                <td id="TzurTd" style={{color: 'red'}} className='numTd'></td>
                <td></td>
            </tr>
            <tr>
                <td>Other costs </td>
                <td id="OthercostsTd" className='numTd'style={{color: 'red'}}></td>
                <td></td>
            </tr>
            <tr>
                <td>Credit Loss Provision</td>
                <td id="CreditLossProvisionTd" className='numTd' style={{color: 'red'}}></td>
                <td></td>
            </tr>
            <tr>
                <td>Monthly Amortization</td>
                <td id="MonthlyAmortizationTd" className='numTd'></td>
                <td></td>
            </tr>
            <tr>
                <td>Operating Income</td>
                <td id="OperatingIncomeTd" className='numTd'></td>
                <td></td>
            </tr>
        </table>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
        navData: state.portfolio.navData
        }
}

export default connect(mapStateToProp,)(NavDetails);