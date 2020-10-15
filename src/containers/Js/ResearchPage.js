import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Css/ResearchPage.css'
import * as repositoryAction from '../../store/actions/RepositoryActions'
import researchImg from '../../images/researchPaper.png';
import Spinner from '../../components/Js/Spinner';
import GeneralChart from '../../components/Js/GeneralChart';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import * as gf from '../../components/Functions/globalFunction';
import { Divider, Grid } from 'semantic-ui-react';
class ResearchPage extends Component {
    state = { 
        allCloNames:[],
        selectNamesArray:[],
        spinner:true,
        selectedClo:null,
        selectedCloIsinArray:[],
        selectedAsOfDate:"empty",
        //line chart params
        fromDate:"2000-01-01",
        toDate:"2200-01-01",
        value:"dailyAssetPrice",
        monthly:"all",
        dateAxios:[],
        //csam columns
        tableColumns:['asOfDate','issuer_Name','portfolioName','currency','spread','assetMaturityDate','costPriceSettled','dailyAssetPrice','markPrice'
        ,'quantity','assetIssueAmount','collateralAdministrator','absType','settlementDate','boughtInMrkrtOrOffering']
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
                                selectedClo:allNames[0],
                                selectedCloIsinArray:[...this.props.CsamRows.filter(f=>{return f.issuer_Name === allNames[0]})]
            });

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
        if(key==="selectedClo"){
            this.setState({selectedCloIsinArray:[...this.props.CsamRows.filter(f=>{return f.issuer_Name === value})]})
        }
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

    ChooseTableColumns=(e)=>{
        let selectElement = e.target;
        let selectedValues = Array.from(selectElement.selectedOptions)
                .map(option => option.value);
        if(selectedValues[0]==='compact'){
            this.setState({tableColumns:['asOfDate','issuer_Name','portfolioName','currency','spread','assetMaturityDate','costPriceSettled','dailyAssetPrice','markPrice'
            ,'quantity','assetIssueAmount','collateralAdministrator','absType','settlementDate','boughtInMrkrtOrOffering']})
        }else{
            this.setState({tableColumns:[...selectedValues]});
        }
        
        
    }

    foundPurchases=(portfolioName)=>{
        let purchases = [];
        let theArray =[...this.state.selectedCloIsinArray.filter(f=>{return f.portfolioName === portfolioName})];
        for(let i=0;i<theArray.length;i++){
            if(i===0){
                purchases.push({date:theArray[i]["asOfDate"],quantity:theArray[i]["quantity"],price:theArray[i]["costPriceSettled"]}); 
            }else if(theArray[i]["quantity"]!==theArray[i-1]["quantity"]){
                purchases.push({date:theArray[i]["asOfDate"],quantity:theArray[i]["quantity"],price:theArray[i]["costPriceSettled"]})
            }
        }

        return purchases;
    }

    foundExposureByPortfolio=(portfolio)=>{
        let portRows = [...this.props.CsamRows.filter(f=>{return f.portfolioName === portfolio})];
        let maxDate = gf.maxDateInList(gf.uniqArrayFromTable(portRows,"asOfDate"));
        let totalPortfolioValue =0;
        let cloValue = 0;
        portRows.map(p=>{
            if(p.asOfDate === maxDate ){
                totalPortfolioValue = totalPortfolioValue + Number(p.quantity)*Number(p.costPriceSettled)/100;
                if(p.issuer_Name===this.state.selectedClo){
                    cloValue += Number(p.quantity)*Number(p.costPriceSettled)/100;
                }
            }
            
        })

        return {date:maxDate,totalPortfolioValue:totalPortfolioValue,cloValue:cloValue}
    }



    render() {
        
        let spinner = null;
        if(this.state.spinner){
            spinner = <Spinner></Spinner>;
        }
        return ( 
            <div>
                <div className='research_Header'>
                    Welcome to the Researh Page <img src={researchImg} alt="researchImg"/>
                                       
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
                <div style={{width:"100%",margin:"3%"}}>
                    <div style={{textDecoration:"underline"}}>CLO CARD</div>
                   <Grid>
                   <Grid.Row>
                       <Grid.Column>
                       <Grid.Row>
                                <Grid.Column>ISIN  </Grid.Column>
                                <Grid.Column style={{marginLeft:"2%",color:"green"}}>{(this.state.selectedCloIsinArray[0]===undefined)?null:this.state.selectedCloIsinArray[0].isin}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>WAL  </Grid.Column>
                                <Grid.Column style={{marginLeft:"2%",color:"green"}}>{(this.state.selectedCloIsinArray[0]===undefined)?null:this.state.selectedCloIsinArray[0].wal}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>Spred  </Grid.Column>
                                <Grid.Column style={{marginLeft:"2%",color:"green"}}>{(this.state.selectedCloIsinArray[0]===undefined)?null:this.state.selectedCloIsinArray[0].spread}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>Collateral Administrator  </Grid.Column>
                                <Grid.Column style={{marginLeft:"2%",color:"green"}}>{(this.state.selectedCloIsinArray[0]===undefined)?null:this.state.selectedCloIsinArray[0].collateralAdministrator}</Grid.Column>
                            </Grid.Row>
                       </Grid.Column>

                      {/* //////////ALL PURCHASES LISTS BY PORTFOLIO */}
                       {(this.state.selectedCloIsinArray[0]===undefined)?null:
                            gf.uniqArrayFromTable(this.state.selectedCloIsinArray,"portfolioName").map((p,i)=>{
                                   return (
                                    
                                    <Grid.Column key={p+"purchases"} style={{marginRight:"10%",marginLeft:"10%"}}>
                                    <Grid.Row style={{textDecoration:"underline"}}>{p}</Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>Total Portfolio For Date</Grid.Column>
                                        <Grid.Column style={{marginLeft:"2%",color:"green"}}>{this.foundExposureByPortfolio(p).date}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>Total Portfolio Value</Grid.Column>
                                        <Grid.Column style={{marginLeft:"2%",color:"green"}}>{this.foundExposureByPortfolio(p).totalPortfolioValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>Total Clo Value</Grid.Column>
                                        <Grid.Column style={{marginLeft:"2%",color:"green"}}>{this.foundExposureByPortfolio(p).cloValue.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>% from Port</Grid.Column>
                                        <Grid.Column style={{marginLeft:"2%",color:"green"}}>{Number(this.foundExposureByPortfolio(p).cloValue/this.foundExposureByPortfolio(p).totalPortfolioValue*100).toFixed(2)+ "%"}</Grid.Column>
                                    </Grid.Row>
                                        {this.foundPurchases(p).map((d,i)=>{
                                            return (
                                                <React.Fragment>
                                                <Grid.Row key={p+d.date}>
                                                    <Grid.Column>As Of Date</Grid.Column>
                                                    <Grid.Column style={{marginLeft:"2%",color:"green"}}>{d.date}</Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>Quantity</Grid.Column>
                                                    <Grid.Column style={{marginLeft:"2%",color:"green"}}>{d.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Grid.Column>Price</Grid.Column>
                                                    <Grid.Column style={{marginLeft:"2%",color:"green"}}>{d.price}</Grid.Column>
                                                </Grid.Row>
                                                <Divider>----</Divider>
                                                </React.Fragment>
                                            )
                                        })}
                                    
                                    </Grid.Column>)
                                       
                                    
                            })}
                           </Grid.Row>
                   </Grid>
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
                   Columns <select  size="3" multiple onChange={(e)=>this.ChooseTableColumns(e)}>
                       <option value="compact" style={{backgroundColor:"lightBlue"}}>Compact</option>
                       {Object.keys(gf.isinRowKeys).map(k=>{
                           return <option key={k+"option"}>{gf.isinRowKeys[k]}</option>
                       })}
                   </select>
                    <table className="table table-hover" id="csamTable">
                        <thead>
                            <tr>
                            {this.state.tableColumns.map(t=>{
                                return <th key={t+"theader"}>{t}</th>
                            })}
                            </tr>
                        </thead>
                        <tbody>

                            {this.props.CsamRows
                                .filter(f=>{return f.issuer_Name===this.state.selectedClo && f.issuer_Name !== null})
                                .sort(function(a,b){
                                    return new Date(a.asOfDate).getTime() > new Date(b.asOfDate).getTime();
                                })
                                .map(c=>{
                                    return (<tr key={c['asOfDate']+c['asset_Name']}>
                                        {this.state.tableColumns.map(t=>{
                                            return <td  data-toggle="tooltip" data-placement="top" title={t}>{c[t]}</td>
                                        })}
                                    
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