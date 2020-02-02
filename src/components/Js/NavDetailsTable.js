import React, { Component } from 'react';
import '../Css/NavDetailsTable.css'
import {connect} from 'react-redux';
import editImg from '../../images/Text-Edit-icon.png'
import saveImg from '../../images/Save-icon.png'
class NavDetails extends Component {
    state = { 
        allowEdit:false
     }


 

    render() { 
        

        // const      AllowEdit = () => {
        //     this.setState({allowEdit: !this.state.allowEdit})
        //     }  
        // if(this.state.allowEdit){
        //     let x =  document.getElementsByClassName("tzur_");
        //     for(let i=0;i<x.length;i++)
        //     {
        //         x[i].removeAttribute("readOnly");
        //     }
        // }
        return ( 
            <table id="calculateNavTable" className="table">
                <tbody>

            <tr  className="table-primary">
                <td>Section</td>
                <td style={{textAlign: 'center'}}>$</td>
                <td style={{textAlign: 'center'}}>%</td>
                <td style={{textAlign: 'center'}}>Tzur </td>
            </tr>	
            <tr>
                <td>Total Assets – All the Anchor fund</td>
                <td id="AllAnchorAssetsTd" className='numTd'>
                     {Number(this.props.allPortfoliosAssetsAmount).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td></td>
                <td><input id='tzur_totalAllAssets' type='text' style={{width:'100%'}} className="btn tzur_" 
                            readOnly placeholder={Number(this.props.tzurNav.totalAssetsAllAnchorfund).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr> 
            <tr>
                <td>Total Assets – Amortized Cost</td>
                <td id="totalAssetsTd" className='numTd'>{Number(this.props.navData.totalAssets).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalAssets/this.props.navData.totalAssets*100).toFixed(0)}</td>
                <td><input id='tzur_totalPortfolioAssets' type='text' style={{width:'100%'}} className="btn  tzur_" 
                            readOnly placeholder={Number(this.props.tzurNav.totalAssetsAmortizedCost).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Lev Interest</td>
                <td id="LevInterestTd" className='numTd'></td>
                <td></td>
                <td><input id='tzur_LevInterest' type='text' style={{width:'100%'}} className="btn  tzur_"
                         readOnly placeholder={Number(this.props.tzurNav.levInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Accrued Interest</td>
                <td id="AccruedInterestTd" className='numTd'>{Number(this.props.navData.totalInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalInterest/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td><input id='tzur_AccruedInterest' type='text' style={{width:'100%'}} className="btn tzur_" 
                            readOnly placeholder={Number(this.props.tzurNav.accruedInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>	
            <tr>
                <td>Gross Interest</td>
                <td id="GrossInterestTd" className='numTd'>{Number(this.props.navData.totalInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{Number(this.props.navData.totalInterest/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td><input id='tzur_GrossInterest' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.grossInterest).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
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
                <td><input id='tzur_CSAMFee' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.csamFee).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Tzur Fees </td>
                <td id="TzurTd" style={{color: 'red'}} className='numTd'></td>
                <td></td>
                <td><input id='tzur_TzurFee' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.tzurFees).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Other costs </td>
                <td id="OthercostsTd" className='numTd'style={{color: 'red'}}></td>
                <td></td>
                <td><input id='tzur_Othercosts' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.otherCosts).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Credit Loss Provision</td>
                <td id="CreditLossProvisionTd" className='numTd' style={{color: 'red'}}>
                    {Number(this.props.navData.totalCreditLossProvision).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>{Number(this.props.navData.totalCreditLossProvision/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td><input id='tzur_CreditLossProvision' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.creditLossProvision).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Monthly Amortization</td>
                <td id="MonthlyAmortizationTd" className='numTd'>
                    {Number(this.props.navData.totalMonthlyAmortization).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>{Number(this.props.navData.totalMonthlyAmortization/this.props.navData.totalAssets*100).toFixed(2)}</td>
                <td><input id='tzur_MonthlyAmortization' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.monthlyAmortization).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
            </tr>
            <tr>
                <td>Operating Income</td>
                <td id="OperatingIncomeTd" className='numTd'></td>
                <td></td>
                <td> <input id='tzur_OperatingIncome' type='text' style={{width:'100%'}} className="btn tzur_"
                           readOnly placeholder={Number(this.props.tzurNav.operatingIncome).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/></td>
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
        allPortfoliosAssetsAmount: state.portfolio.totalPortfoliosAssets,
        tzurNav:state.portfolio.tzurNav
        }
}

export default connect(mapStateToProp,)(NavDetails);