import React, { Component } from 'react';
import'../Css/NavCsamRowsTable.css'



class NavCsamRowTable extends Component {
    state = {  }

    componentDidMount=()=>{
        let maxAsOfDateToMonth= '01-01-2019';
        let month = Number(this.props.dateDetails.navMonth);
        let year= Number(this.props.dateDetails.navYear);
        this.props.csamRows.map((c,index)=>{
            if(new Date(c.asOfDate).getMonth()+1 === month &&
                new Date(c.asOfDate).getFullYear() === year &&
                new Date(c.asOfDate).getTime()>new Date(maxAsOfDateToMonth).getTime() ){
                    maxAsOfDateToMonth = c.asOfDate;
                }
        })
        this.setState({theMaxAsOfDate:maxAsOfDateToMonth});
        console.log(maxAsOfDateToMonth);
    }


    render() { 
        return ( 
            <table className='table table-hover w-75 Nav_csamRows_table'>
                <thead>
                    <tr>                  
                        <th className='th-sm'>Asset Name</th>
                        <th className='th-sm'>Name</th>
                        <th className='th-sm'>ABS Type</th>
                        {/* // <th className='th-sm'>Is new</th> */}
                        <th className='th-sm'>Settlement Date</th>
                        <th className='th-sm'>Quantity</th>
                        <th className='th-sm'>Amortization Costs</th>
                        <th className='th-sm'>Cost Price Settled</th>
                        <th className='th-sm'>Daily Asset Price</th>
                        {/* // <th className='th-sm'>Setteled Amount</th> */}
                        <th className='th-sm'>MarketValueSettledCommitmentBook</th>
                        <th className='th-sm'>mark Price</th>
                        <th className='th-sm'>Begin Month Intrest</th>
                        <th className='th-sm'>Interest Rate</th>
                        <th className='th-sm'>Accrued Interest</th>
                        <th className='th-sm'>spread</th>
                        <th className='th-sm'>Wal</th>
                        <th className='th-sm'>Issue First Coupon Date</th>
                        <th className='th-sm'>Maturity Date</th>
                        <th className='th-sm'>Market/Offering</th>      
                        <th className='th-sm'>As of Date</th>                 
                    </tr>
                </thead>
                <tbody>
                        {this.props.csamRows.map((c,index)=>{
                            if(c.asOfDate === this.state.theMaxAsOfDate){
                                return (
                                    <tr key={'navTableTr'+index}>
                                          <td>{c["issuer_Name"]}</td>
                                            <td>{c["asset_Name"]}</td>
                                            <td>{c["absType"]}</td>
                                                {/* //<td style='color:darkblue'>{c["newAsset"]}</td> */}
                                            <td>{c["settlementDate"]}</td>
                                            <td>{c["quantity"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td style={{color:'darkblue'}}>{c["calculateamortization"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td>{c["costPriceSettled"].toFixed(3)}</td>
                                            <td>{c["dailyAssetPrice"].toFixed(3)}</td>
                                                {/* //<td class='numTd'>({c["costPriceSettled"]*c["quantity"]/100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td> */}
                                            <td class='numTd'>{c["marketValueSettledCommitmentBook"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td class='numTd'>{c["markPrice"].toFixed(2)}</td>
                                            <td>{c["interestBeginMonth"]}</td>
                                            <td>{c["interestRate"]}</td>
                                            <td style={{color:'darkblue'}}>{c["clculateInterest"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td>{c["spread"]}</td>
                                            <td>{c["wal"]}</td>
                                            <td>{c["issueFirstCouponDate"]}</td>
                                            <td>{c["assetMaturityDate"]}</td>
                                            <td>{c["boughtInMrkrtOrOffering"]}</td>
                                            <td>{c["asOfDate"]}</td>
                                    </tr>
                                )
                            }
                        
                        })}
                </tbody>





            </table>
         );
    }
}
 
export default NavCsamRowTable;