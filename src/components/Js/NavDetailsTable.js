import React, { Component } from 'react';
import '../Css/NavDetailsTable.css'
import {connect} from 'react-redux';


class NavDetails extends Component {
    state = {  }
    render() { 


        return ( 
            <table id="calculateNavTable" className="table">
                <tbody>

            <tr  className="table-primary">
                <td>Section</td>
                <td style={{textAlign: 'center'}}>$</td>
                <td style={{textAlign: 'center'}}>%</td>
                <td style={{textAlign: 'center'}}>Tzur</td>
            </tr>	
            <tr>
                <td>Total Assets – All the Anchor fund</td>
                <td id="AllAnchorAssetsTd" className='numTd'>
                     {Number(this.props.allPortfoliosAssetsAmount).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td></td>
                <td></td>
            </tr> 
            <tr>
                <td>Total Assets – Amortized Cost</td>
                <td id="totalAssetsTd" className='numTd'>{Number(this.props.navData.totalAssets).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalAssets/this.props.navData.totalAssets*100).toFixed(0)}</td>
            </tr>
            <tr>
                <td>Lev Interest</td>
                <td id="LevInterestTd" className='numTd'></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Accrued Interest</td>
                <td id="AccruedInterestTd" className='numTd'>{Number(this.props.navData.totalInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalInterest/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td></td>
            </tr>	
            <tr>
                <td>Gross Interest</td>
                <td id="GrossInterestTd" className='numTd'>{Number(this.props.navData.totalInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalInterest/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td></td>
            </tr>

            <tr  className="table-primary">
                <td>Operational Costs</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>	 

            <tr>
                <td>CSAM Fee</td>
                <td id="CSAMFeeTd" className='numTd'></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Tzur Fees </td>
                <td id="TzurTd" style={{color: 'red'}} className='numTd'></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Other costs </td>
                <td id="OthercostsTd" className='numTd'style={{color: 'red'}}></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Credit Loss Provision</td>
                <td id="CreditLossProvisionTd" className='numTd' style={{color: 'red'}}>
                    {Number(this.props.navData.totalCreditLossProvision).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>{Number(this.props.navData.totalCreditLossProvision/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Monthly Amortization</td>
                <td id="MonthlyAmortizationTd" className='numTd'>
                    {Number(this.props.navData.totalMonthlyAmortization).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>{Number(this.props.navData.totalMonthlyAmortization/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Operating Income</td>
                <td id="OperatingIncomeTd" className='numTd'></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
        navData: state.portfolio.navData,
        allPortfoliosAssetsAmount: state.portfolio.totalPortfoliosAssets
        }
}

export default connect(mapStateToProp,)(NavDetails);