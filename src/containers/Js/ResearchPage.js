import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Css/ResearchPage.css'
import * as repositoryAction from '../../store/actions/RepositoryActions'
import researchImg from '../../images/researchPaper.png';
import Spinner from '../../components/Js/Spinner';
import GeneralChart from '../../components/Js/GeneralChart';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';

class ResearchPage extends Component {
    state = { 
        allCloNames:[],
        selectNamesArray:[],
        spinner:true,
        selectedClo:null,
        selectedAsOfDate:"empty",
        //line chart params
        fromDate:"2000-01-01",
        toDate:"2200-01-01",
        value:"dailyAssetPrice",
        monthly:"all",
        dateAxios:[]
     }

  
    componentDidMount=()=>{
    
        let check = setInterval(() => {
            if(this.props.CsamRows !==null){
                this.props.GetAllCsamRows();
            }
            
            let allNames = [];
            let allRows =[...this.props.CsamRows];

            allRows.map(r=>{
                if(allNames.indexOf(r.issuer_Name) === -1){
                    allNames.push(r.issuer_Name); 
                }
            });
            this.setState({allCloNames:allNames.sort(),
                                selectNamesArray:allNames.sort(),
                                selectedClo:allNames[0]
            })
            console.log(allNames.sort());  
            console.log(allNames[0]);
            
            if(allNames.length > 0)
            {
                clearInterval(check);
                this.setState({spinner:false})
            }
        }, 4000);
    
    }

 
    changeState = (key,value)=>
    {
        this.setState({[key]:value});
    }
    
    craeteAsOfDates=()=>
    {
        let asOfDateList=[];
        this.props.CsamRows.filter(f=>{return f.issuer_Name===this.state.selectedClo}).map(c=>{
            if(asOfDateList.indexOf(c.asOfDate)===-1){
                asOfDateList.push(c.asOfDate);
            }
        })
        asOfDateList.sort(function(a,b){
           return new Date(a).getTime() > new Date(b).getTime();
        })
       
        return asOfDateList;
    }

    crateAxiosLineDates=()=>{
        let newArray=[];
        let asOfDateList = this.craeteAsOfDates();
        this.props.CsamRows.filter(f=>{return f.issuer_Name===this.state.selectedClo}).map(a=>{
            if(new Date(a.asOfDate).getTime()>=new Date(this.state.fromDate).getTime() &&
                new Date(a.asOfDate).getTime()<=new Date(this.state.toDate).getTime()){
                    if(this.state.monthly==="all"){
                        newArray.push(a.asOfDate);
                    }else if(a.monthlyOrWeekly==="monthly"){
                        newArray.push(a.asOfDate);
                    }
                }
        })
        return newArray;
    }

 

    render() {
        
        let spinner = null;
        if(this.state.spinner){
            spinner = <Spinner></Spinner>;
        }
        return ( 
            <div>
                <div className='research_Header'>
                    Welcom to the Researh Page <img src={researchImg} alt="researchImg"/>
                                       
                </div>
                <div style={{width:"100%",textAlign:"center"}}>
                    {spinner}
                    <br></br>
                <select className="btn " onChange={(e)=>this.changeState('selectedClo',e.target.value)} style={{marginRight:"3%",fontSize:"130%",backgroundColor:"rgb(6, 117, 168)"}}>
                    {this.state.selectNamesArray.map((a,index)=>{
                        return <option key={"researchOptionId-"+index} value={a}>{a}</option>
                    })}
                    </select>
              
                </div>
                <div id="researchChartArea" style={{width:"100%",margin:"2%"}}>
                    <span style={{width:"50%",float:"right"}}>
                    <div className="research_chartHeader">
                            Quantity Allocation Pie <br></br>
                            As Of Date<select className="researchInput" value={this.state.selectedAsOfDate} onLoad={(e)=>this.changeState('selectedAsOfDate',e.target.value)} onChange={(e)=>this.changeState('selectedAsOfDate',e.target.value)}>
                                <option value="empty"></option>
                                {this.craeteAsOfDates().map((d,index)=>{
                                    return <option key={"researchAsOfDateOptionId-"+index} value={d}>{d}</option>
                                })}
                            </select>
                    </div>
                    <GeneralChart chartType="Pie" chrtTableId='quantityCloTable' width={'700'} height={'300'}
                                                                
                                                                array={this.props.CsamRows.filter(f=>{return f.asOfDate===this.state.selectedAsOfDate})}
                                                                rowFiledName={'issuer_Name'}
                                                                rowsHeaders={[this.state.selectedClo]}
                                                                columnFileName={'portfolioName'}
                                                                columnHeaders={['Active','HTM','HTM-Leverage']}
                                                                value={"quantity"}
                                                                averageStatus={'No'}
                                                                averageByField={'noFiledGroubBy'}
                                                                includeRow_ColumnsHeaders={true}/>
                    </span> 
                    <span  style={{width:"50%",float:"left"}}>
                        <div className="research_chartHeader">
                            Line Chart <br></br>
                            From Date<input className="researchInput" type="date" onChange={(e)=>this.changeState('fromDate',e.target.value)}/> 
                            To Date<input className="researchInput" type="date" onChange={(e)=>this.changeState('toDate',e.target.value)}/>
                            <br></br>
                            Param <select className="researchInput" onChange={(e)=>this.changeState('value',e.target.value)}>
                                        <option value='dailyAssetPrice' selected>Daily Asset Price</option>
                                        <option value='warf'>WARF</option>
                                        <option value='marketValueSettledCommitmentBook'>Setteled</option>
                                        <option value='trancheOC'>Tranche OC</option>
                                        <option value='trancheOcCushion'>Tranche OC Cushion</option>
                                        <option value='deltaFromSettled'>Price Delta From Setteled</option>
                                  </select>
                              Type <select className="researchInput" onChange={(e)=>this.changeState('monthly',e.target.value)}>
                                    <option value='all' >All</option>
                                    <option value='monthly'>Monthly Only</option>
                                </select>
                        </div>
                    <GeneralChart chartType="Line" chrtTableId='PriceCloTable' width={'1000'} height={'600'}
                                                            minYaxis={"70"}
                                                            array={ this.props.CsamRows }
                                                            rowFiledName={'issuer_Name'}
                                                            rowsHeaders={[this.state.selectedClo]}
                                                            columnFileName={'asOfDate'}
                                                            columnHeaders={[...this.crateAxiosLineDates()]}
                                                            value={this.state.value}
                                                            averageStatus={'yes'}
                                                            averageByField={'quantity'}
                                                            includeRow_ColumnsHeaders={true}/>
                    </span>
                </div>

                <div id="isinRowTableArea" style={{margin:"2%",width:"100%",float:"left"}}>
                    <div style={{width:"100%"}}>
                        <ReactToExcel className="btn " 
                            table={"csamTable"}
                            filename="CSAM Table"
                            sheet="CSAM Table"
                            buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                            />  
                    </div>
                   
                    <table className="table table-hover" id="csamTable">
                        <thead>
                            <tr>
                            <th>As of Date</th>
                            <th>Issuer_Name</th>
                            <th>Portfolio</th>
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
                        <tbody>
                            {this.props.CsamRows
                                .filter(f=>{return f.issuer_Name===this.state.selectedClo})
                                .sort(function(a,b){
                                    return new Date(a.asOfDate).getTime() > new Date(b.asOfDate).getTime();
                                })
                                .map(c=>{
                                    return (<tr key={c['asOfDate']+c['asset_Name']}>
                                    <td  data-toggle="tooltip" data-placement="top" title='As of Date'>{c['asOfDate']}</td>
                                    <td data-toggle="tooltip" data-placement="top" title='Issuer_Name'>{c['issuer_Name']}</td>
                                    <td data-toggle="tooltip" data-placement="top" title='Asset_Name'>{c['portfolioName']}</td>
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
                                    </tr>)
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
            
         );
    }
}
 
const mapStateToProp = state =>
{
    return {
        CsamRows:state.repository.csamRows,
        asOfDateList:state.repository.allAsOfDates,
        token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        GetAllCsamRows:() => dispatch(repositoryAction.getAllCsamRows())
    }
}


export default connect(mapStateToProp,mapDispatchToProps)(ResearchPage);