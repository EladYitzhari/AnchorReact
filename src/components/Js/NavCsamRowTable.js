import React, { Component } from 'react';
import'../Css/NavCsamRowsTable.css'
import * as dateFunc from '../../components/Functions/dateFunctions';
import {connect} from 'react-redux';
import * as portfolioActions from '../../store/actions/PortfolioActions'
import * as actionTypes from '../../store/actions/actionTypes';
import { extractHeadersToTh } from '../Functions/globalFunction';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import Spinner from './Spinner';



class NavCsamRowTable extends Component {
    state = { 
        lastMonthArray:[],
        theMaxAsOfDate:'01-01-2017',
        navDataToPass:{
            totalInterest:0,
            totalMonthlyAmortization:0,
            totalAssets:0,
            noDataFlag:false,
            showSpinner:false
        }
            
        
       
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
        ////////////
        this.setState({showSpinner: true});
        setTimeout(() => {
            this.CalculateTotalsMeasures();
            this.setState({showSpinner: false});
        },2000);
        
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
        let numOfDaysInMonth = dateFunc.numOfDaysInMonth(asOfDate.getMonth());
        let couponDayInMonth =new Date(thisMonthQuat["issueFirstCouponDate"]).getDate();
        if(settlementDate.getMonth() === asOfDate.getMonth() && settlementDate.getFullYear() === asOfDate.getFullYear())
        {
            return ((numOfDaysInMonth-settlementDate.getDate())/numOfDaysInMonth*interest/100/12*quantity).toFixed(0);
        }else if(lastMonthInterest === interest){
            return (interest/100/12*quantity).toFixed(0);
        }else if(lastMonthInterest !== 'No Data' && lastMonthInterest !== interest){
            console.log(thisMonthQuat["issuer_Name"]+ "lastMonthInterest: "+lastMonthInterest+" interest: "+interest);

            return ((numOfDaysInMonth-couponDayInMonth)/numOfDaysInMonth*interest/12/100*quantity+couponDayInMonth/numOfDaysInMonth*lastMonthInterest/12/100*quantity).toFixed(0);
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

    CreditLossProvisionPerRow=(csamRow,thisMonthDate)=>{
        let repor_Month = new Date(thisMonthDate).getMonth();
        let rowSetteled_Month = new Date(csamRow["settlementDate"]).getMonth();
        let repor_Year = new Date(thisMonthDate).getFullYear();
        let rowSetteled_Year = new Date(csamRow["settlementDate"]).getFullYear();
        return (repor_Month === rowSetteled_Month && 
            repor_Year===rowSetteled_Year)?  csamRow["costPriceSettled"]/100*csamRow["quantity"]*0.0012   : 0;
    }
    CreditLossProvisionPositiveAmountFromSellingLastMonthClos=()=>{
        let totalPositiveDeltaOfSelling = 0;
        let lastMonthArray = [...this.state.lastMonthArray];
        let csamRowArray =[... this.props.csamRows];
        let notFindFlag = true;
        lastMonthArray.map((c,index)=>{
            notFindFlag = true;
            for(let i=0;i<csamRowArray.length;i++){
                if(csamRowArray[i]["issuer_Name"] === c.issuer_Name && csamRowArray[i]["asOfDate"] === this.state.theMaxAsOfDate){
                    notFindFlag = false;
                    break;
                }
            }
            if(notFindFlag){
                totalPositiveDeltaOfSelling += c.quantity*(c.costPriceSettled/100)*0.0012;
            }
            
        });
        return totalPositiveDeltaOfSelling;
    }	

    CalculateTotalsMeasures =()=>{

        let totalInterest =0;
        let totalMonthlyAmortization=0;
        let totalAssets =0;
        let noDataFlag = false;
        let totalCreditLossProvision = 0;
        this.props.csamRows.map((c,index)=>{
            if(c.asOfDate === this.state.theMaxAsOfDate){
                let rowInteret = this.CalculateInterest(c,this.FindLastMonth_CLO_Quat(c["issuer_Name"]));
                totalMonthlyAmortization += this.MonthlyAmortization(c);
                (c.portfolioName ==='Active')? totalAssets+= c.marketValueSettledCommitmentBook : totalAssets+=c.quantity*(c.costPriceSettled/100);
                totalCreditLossProvision += this.CreditLossProvisionPerRow(c,this.state.theMaxAsOfDate);
                if(rowInteret === 'No Data' || rowInteret === null)
                {
                    noDataFlag = true;
                }else{
                    totalInterest = totalInterest + Number(rowInteret);
                }
            }
        })
        let newNavDataToPass2 = {...this.state.navDataToPass};
        newNavDataToPass2.totalInterest = totalInterest;
        newNavDataToPass2.totalMonthlyAmortization = totalMonthlyAmortization;
        newNavDataToPass2.totalAssets = totalAssets;
        newNavDataToPass2.noDataFlag = noDataFlag;
        newNavDataToPass2.totalCreditLossProvision = totalCreditLossProvision-this.CreditLossProvisionPositiveAmountFromSellingLastMonthClos();
        this.props.UpdateNavData(newNavDataToPass2);
    }



    render() { 

        let spinner = null;
        if(this.state.showSpinner)
        {
            spinner=  <Spinner/>;
        }
        return ( 
            <React.Fragment>
                <div className='spinnerDiv'>
                   {spinner}
                </div>
                
                <div id="dounloadDivCsamRowTableNavPage">
                    <ReactToExcel className="btn "
                        table="csamRowTableNavPage"
                        filename="Csam Row Table NavPage"
                        sheet="Csam Row"
                        buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />

                </div>
            <table className='table table-hover w-75 Nav_csamRows_table' id="csamRowTableNavPage">
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
                                          <td data-toggle="tooltip" data-placement="top" title="Issuer Name">{c["issuer_Name"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Asset Name">{c["asset_Name"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Abs Type">{c["absType"]}</td>
                                                {/* //<td style='color:darkblue'>{c["newAsset"]}</td> */}
                                            <td data-toggle="tooltip" data-placement="top" title="Settlement Date">{(c["settlementDate"]=== null)?<span style={{color:'red'}}>Missing Date</span>:c["settlementDate"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="quantity">{c["quantity"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Monthly Amortization" style={{color:'darkblue'}}>{this.MonthlyAmortization(c).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Cost Price Settled">{(c["costPriceSettled"]=== 0)?<span style={{color:'red'}}>Missing Date</span>:c["costPriceSettled"].toFixed(3)}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Daily Asset Price">{c["dailyAssetPrice"].toFixed(3)}</td>
                                                {/* //<td class='numTd'>({c["costPriceSettled"]*c["quantity"]/100).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td> */}
                                            <td data-toggle="tooltip" data-placement="top" title="Market Value SettledCommitmentBook" class='numTd'>{c["marketValueSettledCommitmentBook"].toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td  data-toggle="tooltip" data-placement="top" title="Mark Price"class='numTd'>{c["markPrice"].toFixed(2)}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Begin Month Intrest" style={{color:'darkblue'}}>{this.FindLastMonth_CLO_Quat(c["issuer_Name"]).interestRate}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Interest Rate">{c["interestRate"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Accrued Interest" style={{color:'darkblue'}}>{this.CalculateInterest(c,this.FindLastMonth_CLO_Quat(c["issuer_Name"])).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Spread">{c["spread"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Wal">{c["wal"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Issue First Coupon Date">{c["issueFirstCouponDate"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Asset Maturity Date">{c["assetMaturityDate"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="Bought In MrkrtOrOffering">{c["boughtInMrkrtOrOffering"]}</td>
                                            <td data-toggle="tooltip" data-placement="top" title="As Of Date">{c["asOfDate"]}</td>
                                    </tr>
                                )
                            }
                        })}
                </tbody>





            </table>
            </React.Fragment>
         );
    }
}
 
const mapDispatchToProps = dispatch =>
{
    return {
        UpdateNavData: (navData) => dispatch({type:actionTypes.UPDATE_NAV_DATA_TO_PORTFOLIO,val:navData})
    }
}


export default connect(null,mapDispatchToProps)(NavCsamRowTable);