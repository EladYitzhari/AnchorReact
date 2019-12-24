import React, { Component } from 'react';
import Spinner from './Spinner';
import '../Css/CsamRowsTable.css'
import {connect} from 'react-redux';




class CsamRowsTable extends Component {


    render() { 

    const filterTableAsOfDate=(row)=>
    {
        return new Date(row.asOfDate).getTime() === new Date(this.props.asOfDate).getTime();
    }

    ////////////////  CREATE THE TABLE IF NO DATA PUT SPPINER//////
    let tableBody = null;
    if(this.props.list.filter(filterTableAsOfDate).length >0)
    {
        
        tableBody = (
            this.props.list.filter(filterTableAsOfDate).map(c=>{
                return (
                    <tbody>
                    <tr key={c['asOfDate']+c['asset_Name']}>
                        <td  data-toggle="tooltip" data-placement="top" title='As of Date'>{c['asOfDate']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Issuer_Name'>{c['issuer_Name']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Asset_Name'>{c['asset_Name']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Currency'>{c['currency']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Spread'>{c['spread']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Asset Maturity Date'>{c['assetMaturityDate']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Cost Price'>{c['costPriceSettled']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Daily Asset Price'>{c['dailyAssetPrice'].toFixed(3)}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Mark Price'>{c['markPrice'].toFixed(3)}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Quantity'>{c['quantity'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Asset Issue Amount'>{c['assetIssueAmount'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Collateral Administrator'>{c['collateralAdministrator']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Abs Type'>{c['absType']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Settlement Date'>{c['settlementDate']}</td>
                        <td data-toggle="tooltip" data-placement="top" title='Market/Offering'>{c['boughtInMrkrtOrOffering']}</td>
                    </tr>
                    </tbody>
                )
            })
        )
    }else{
        tableBody =   <Spinner />;
    }


        return ( 
            <table id="csamRowsTable" className="table table-hover csamTable">
            <thead>
                <tr>
                    <th>As of Date</th>
                    <th>Issuer_Name</th>
                    <th>Asset_Name</th>
                    <th>Currency</th>
                    <th>Spread</th>
                    <th>Asset Maturity Date</th>
                    <th>Cost Price</th>
                    <th>Daily Asset Price</th>
                    <th>Mark Price</th>
                    <th>Quantity</th>
                    <th>Asset Issue Amount</th>
                    <th>Collateral Administrator</th>
                    <th>Abs Type</th>
                    <th>Settlement Date</th>
                    <th>Market/Offering</th>

   
  
                </tr>
            </thead>
            
               {tableBody}
            
        </table>
         );
    }
}
 




export default CsamRowsTable;