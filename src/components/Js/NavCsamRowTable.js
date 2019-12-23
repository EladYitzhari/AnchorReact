import React, { Component } from 'react';
import'../Css/NavCsamRowsTable.css'
import * as dateFunc from '../../components/Functions/dateFunctions';


class NavCsamRowTable extends Component {
    state = { 
        lastMonthArray:[],
        theMaxAsOfDate:'01-01-2017'
     }

    componentDidMount=()=>{
        let maxAsOfDateToMonth= '01-01-2017';
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
        //find the last month array for interest calculation and store it in the state
        this.CreateLastMonthArray();
    }

    FindLastMonthMaxAsOfDate=()=>{
        let month = Number(this.props.dateDetails.navMonth);
        let year= Number(this.props.dateDetails.navYear);
        if(month !== 0){
            month = month-1;
        }else{
            year = year -1;
            month = 12;
        }
        let maxAsOfDateToMonth= '01-01-2017';
        this.props.csamRows.map((c,index)=>{
            if(new Date(c.asOfDate).getMonth()+1 === month &&
                new Date(c.asOfDate).getFullYear() === year &&
                new Date(c.asOfDate).getTime()>new Date(maxAsOfDateToMonth).getTime() ){
                    maxAsOfDateToMonth = c.asOfDate;
                }
        })
        return maxAsOfDateToMonth;
    }
    CreateLastMonthArray=()=>{
       let lastMonth = this.FindLastMonthMaxAsOfDate();       
       let lastMonthArray = [];
       this.props.csamRows.map((c,index)=>{
        if(c.asOfDate === lastMonth){
                lastMonthArray.push(c);
            }       
        })
        this.setState({lastMonthArray:lastMonthArray});
    }

    FindLastMonth_CLO_Quat=(issuer_Name)=>{
        let lastMonth = this.state.lastMonthArray;
        let theRow;
        let flag= true;
        for(let i=0;i<lastMonth.length;i++){
            if(lastMonth[i]["issuer_Name"] === issuer_Name){
                theRow = lastMonth[i];
                flag = false;
                break;
            }
        }
        if(flag){
            theRow = {interestRate:'No Data'};
        }
        return theRow;
    }

    CalculateInterest = (thisMonthQuat,lastMonthQuat)=>{
        let settlementDate = new Date(thisMonthQuat["settlementDate"]);
        let asOfDate = new Date(thisMonthQuat["asOfDate"]);
        let quantity = thisMonthQuat["quantity"];
        let interest = thisMonthQuat["interestRate"];
        let lastMonthInterest = lastMonthQuat["interestRate"];
        let costPrice = thisMonthQuat["costPriceSettled"];
        let numOfDaysInMonth = dateFunc.numOfDaysInMonth(settlementDate.getMonth());
        let settelmentDayInMonth = settlementDate.getDate();
        if(settlementDate.getMonth() === asOfDate.getMonth() && settlementDate.getFullYear() === asOfDate.getFullYear())
        {
            console.log(thisMonthQuat["issuer_Name"]+" inside");
            return ((numOfDaysInMonth-settlementDate.getDate())/numOfDaysInMonth*interest/100/12*quantity).toFixed(0);
        }else if(lastMonthInterest === interest){
            return (interest/100/12*quantity).toFixed(0);
        }else if(lastMonthInterest !== 'No Data' && lastMonthInterest !== interest){
            return ((numOfDaysInMonth-settelmentDayInMonth)/numOfDaysInMonth*interest/12/100*quantity+
                        settelmentDayInMonth/numOfDaysInMonth*lastMonthInterest/12/100*quantity).toFixed(0);
        }else{
            return 'No Data';
        }
    }

    MonthlyAmortization = (csamRow)=>
    {
        let wal = csamRow.wal;
        let costPrice = csamRow["costPriceSettled"];
        let quantity = csamRow.quantity;
        return Number((100-costPrice)/100*quantity/(wal*12));
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
                                            <td style={{color:'darkblue'}}>{this.MonthlyAmortization(c).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td>{c["costPriceSettled"].toFixed(3)}</td>
                                            <td>{c["dailyAssetPrice"].toFixed(3)}</td>
                                                {/* //<td class='numTd'>({c["costPriceSettled"]*c["quantity"]/100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td> */}
                                            <td class='numTd'>{c["marketValueSettledCommitmentBook"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td class='numTd'>{c["markPrice"].toFixed(2)}</td>
                                            <td style={{color:'darkblue'}}>{this.FindLastMonth_CLO_Quat(c["issuer_Name"]).interestRate}</td>
                                            <td>{c["interestRate"]}</td>
                                            <td style={{color:'darkblue'}}>{this.CalculateInterest(c,this.FindLastMonth_CLO_Quat(c["issuer_Name"])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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