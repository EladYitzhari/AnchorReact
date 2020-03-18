import React, { Component } from 'react';
import {connect} from 'react-redux';



class CsamRowCard extends Component {
    state = {  }


    updateState = (e,key)=>{
        this.setState({[key]:e.target.value});
    }
    render() { 
        return ( 
            <React.Fragment>
            <table>
                <tr><td>id</td> <td> <input type="text" placeholder={this.props.csamRowEdit.id}  onClick={(e)=>this.updateState(e,"id")}/></td></tr>
                <tr><td>isin</td> <td> <input type="text" placeholder={this.props.csamRowEdit.isin}  onClick={(e)=>this.updateState(e,"isin")}/></td></tr>
                <tr><td>issuer_Name</td> <td> <input type="text" placeholder={this.props.csamRowEdit.issuer_Name}  onClick={(e)=>this.updateState(e,"issuer_Name")}/></td></tr>
                <tr><td>asset_Name</td> <td> <input type="text" placeholder={this.props.csamRowEdit.asset_Name}  onClick={(e)=>this.updateState(e,"asset_Name")}/></td></tr>
                <tr><td>cusip</td> <td> <input type="text" placeholder={this.props.csamRowEdit.cusip}  onClick={(e)=>this.updateState(e,"cusip")}/></td></tr>
                <tr><td>bloombergId</td> <td> <input type="text" placeholder={this.props.csamRowEdit.bloombergId}  onClick={(e)=>this.updateState(e,"bloombergId")}/></td></tr>
                <tr><td>currency</td> <td> <input type="text" placeholder={this.props.csamRowEdit.currency}  onClick={(e)=>this.updateState(e,"currency")}/></td></tr>
                <tr><td>quantity</td> <td> <input type="number" placeholder={this.props.csamRowEdit.quantity}  onClick={(e)=>this.updateState(e,"quantity")}/></td></tr>
                <tr><td>tradeCommitmentBook</td> <td> <input type="number" placeholder={this.props.csamRowEdit.tradeCommitmentBook}  onClick={(e)=>this.updateState(e,"tradeCommitmentBook")}/></td></tr>
                <tr><td>settledCommitmentBook</td> <td> <input type="number" placeholder={this.props.csamRowEdit.settledCommitmentBook}  onClick={(e)=>this.updateState(e,"settledCommitmentBook")}/></td></tr>
                <tr><td>marketValueTradeCommitmentBook</td> <td> <input type="number" placeholder={this.props.csamRowEdit.marketValueTradeCommitmentBook}  onClick={(e)=>this.updateState(e,"marketValueTradeCommitmentBook")}/></td></tr>
                <tr><td>marketValueSettledCommitmentBook</td> <td> <input type="number" placeholder={this.props.csamRowEdit.marketValueSettledCommitmentBook}  onClick={(e)=>this.updateState(e,"marketValueSettledCommitmentBook")}/></td></tr>
                <tr><td>costPriceTraded</td> <td> <input type="number" placeholder={this.props.csamRowEdit.costPriceTraded}  onClick={(e)=>this.updateState(e,"costPriceTraded")}/></td></tr>
                <tr><td>costPriceSettled</td> <td> <input type="number" placeholder={this.props.csamRowEdit.costPriceSettled}  onClick={(e)=>this.updateState(e,"costPriceSettled")}/></td></tr>
                <tr><td>markPrice</td> <td> <input type="number" placeholder={this.props.csamRowEdit.markPrice}  onClick={(e)=>this.updateState(e,"markPrice")}/></td></tr>
                <tr><td>accruedInterest</td> <td> <input type="number" placeholder={this.props.csamRowEdit.accruedInterest}  onClick={(e)=>this.updateState(e,"accruedInterest")}/></td></tr>
                <tr><td>interestRate</td> <td> <input type="number" placeholder={this.props.csamRowEdit.interestRate}  onClick={(e)=>this.updateState(e,"interestRate")}/></td></tr>
                <tr><td>spread</td> <td> <input type="number" placeholder={this.props.csamRowEdit.spread}  onClick={(e)=>this.updateState(e,"spread")}/></td></tr>
                <tr><td>pikSpread</td> <td> <input type="number" placeholder={this.props.csamRowEdit.pikSpread}  onClick={(e)=>this.updateState(e,"pikSpread")}/></td></tr>
                <tr><td>accrualStartDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.accrualStartDate}  onClick={(e)=>this.updateState(e,"vaccrualStartDatear")}/></td></tr>
                <tr><td>accrualEndDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.accrualEndDate}  onClick={(e)=>this.updateState(e,"accrualEndDate")}/></td></tr>
                <tr><td>assetMaturityDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.assetMaturityDate}  onClick={(e)=>this.updateState(e,"assetMaturityDate")}/></td></tr>
                <tr><td>issueFirstCouponDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.issueFirstCouponDate}  onClick={(e)=>this.updateState(e,"issueFirstCouponDate")}/></td></tr>
                <tr><td>assetIssueAmount</td> <td> <input type="number" placeholder={this.props.csamRowEdit.assetIssueAmount}  onClick={(e)=>this.updateState(e,"assetIssueAmount")}/></td></tr>
                <tr><td>assetCurrentCommitmentAmount</td> <td> <input type="number" placeholder={this.props.csamRowEdit.assetCurrentCommitmentAmount}  onClick={(e)=>this.updateState(e,"assetCurrentCommitmentAmount")}/></td></tr>
                <tr><td>instrumentMoodysRating</td> <td> <input type="text" placeholder={this.props.csamRowEdit.instrumentMoodysRating}  onClick={(e)=>this.updateState(e,"instrumentMoodysRating")}/></td></tr>
                <tr><td>instrumentSPRating</td> <td> <input type="text" placeholder={this.props.csamRowEdit.instrumentSPRating}  onClick={(e)=>this.updateState(e,"instrumentSPRating")}/></td></tr>
                <tr><td>wal</td> <td> <input type="number" placeholder={this.props.csamRowEdit.wal}  onClick={(e)=>this.updateState(e,"wal")}/></td></tr>
                <tr><td>absType</td> <td> <input type="text" placeholder={this.props.csamRowEdit.absType}  onClick={(e)=>this.updateState(e,"absType")}/></td></tr>
                <tr><td>collateralAdministrator</td> <td> <input type="text" placeholder={this.props.csamRowEdit.collateralAdministrator}  onClick={(e)=>this.updateState(e,"collateralAdministrator")}/></td></tr>
                <tr><td>dailyAssetPrice</td> <td> <input type="number" placeholder={this.props.csamRowEdit.dailyAssetPrice}  onClick={(e)=>this.updateState(e,"dailyAssetPrice")}/></td></tr>
                <tr><td>trustee</td> <td> <input type="text" placeholder={this.props.csamRowEdit.trustee}  onClick={(e)=>this.updateState(e,"trustee")}/></td></tr>
                <tr><td>trancheOC</td> <td> <input type="number" placeholder={this.props.csamRowEdit.trancheOC}  onClick={(e)=>this.updateState(e,"trancheOC")}/></td></tr>
                <tr><td>trancheOcCushion</td> <td> <input type="number" placeholder={this.props.csamRowEdit.trancheOcCushion}  onClick={(e)=>this.updateState(e,"trancheOcCushion")}/></td></tr>
                <tr><td>juniorOC</td> <td> <input type="number" placeholder={this.props.csamRowEdit.juniorOC}  onClick={(e)=>this.updateState(e,"juniorOC")}/></td></tr>
                <tr><td>juniorOcCushion</td> <td> <input type="number" placeholder={this.props.csamRowEdit.juniorOcCushion}  onClick={(e)=>this.updateState(e,"juniorOcCushion")}/></td></tr>
                <tr><td>warf</td> <td> <input type="number" placeholder={this.props.csamRowEdit.warf}  onClick={(e)=>this.updateState(e,"warf")}/></td></tr>
                <tr><td>settlementDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.settlementDate}  onClick={(e)=>this.updateState(e,"settlementDate")}/></td></tr>
                <tr><td>boughtInMrkrtOrOffering</td> <td> <input type="text" placeholder={this.props.csamRowEdit.boughtInMrkrtOrOffering}  onClick={(e)=>this.updateState(e,"boughtInMrkrtOrOffering")}/></td></tr>
                <tr><td>asOfDate</td> <td> <input type="date" placeholder={this.props.csamRowEdit.asOfDate}  onClick={(e)=>this.updateState(e,"asOfDate")}/></td></tr>
            </table>
            </React.Fragment>
         );
    }
}

const mapStateToProp = state =>
{
    return {

            csamRows:state.portfolio.csamRows,
            token:state.auth.token
        }
}
export default connect(mapStateToProp,)(CsamRowCard);