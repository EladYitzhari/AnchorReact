import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import lineChartImg from '../../images/Line-Graph-icon.png'
import searchIcon from '../../images/Search-icon.png';
import calanderImg from '../../images/calendar-icon.png';
import classesImg from '../../images/database-icon.png';
import '../Css/Portfolio.css'
import * as portfolioActions from '../../store/actions/PortfolioActions'
import ClassTable from '../../components/Js/ClassTable';
import SelectCreator from '../../components/Js/selectCreator';
import CsamRowsTable from '../../components/Js/CsamRowsTable';
import Chart from '../../components/Js/Chart'
import GeneralChart from '../../components/Js/GeneralChart';
import * as globalFunction from '../../components/Functions/globalFunction';
import chartImg from '../../images/Graph-Magnifier-icon.png';


class Portfolio extends Component {
    state = { 
        classes : [...this.props.classes],
        showClasses : false,
        portfolioName: 'HTM-Leverage',
        asOfDateList: [...this.props.asOfDateList],
        fromDate:'2018-12-01',
        toDate:'2022-12-01',
        reportType:"all",
        showSearchControlls : false,
        csamRows:[...this.props.csamRows],
        showCsamRowsTable:false,
        lineField:'dailyAssetPrice',
        showOptionsCharts:false,
        minYaxis:80,
        lineButtomField:'dailyAssetPrice',
        ChartArea:false
        
 
     }

    componentDidMount =() => {
        ///Check if token exist, if not send the client to the login page
        if(this.props.token === null && localStorage.getItem("token") === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }
        //deal with the portfolio name
        let portfolioName = String(this.props.location.hash).replace('#','');
        //insert into the general state
        this.props.ChangePortfolioName(portfolioName);
        //update the local state
        this.setState({ portfolioName: portfolioName});
        //bring all the AS OF DATE of the portfolio
        this.props.GetAllAsOfDate(portfolioName);
        this.props.GetAsOfDateListMonthOnly(portfolioName);
        //bring all the SCAM ROWS of the portfolio
        this.props.GetACsamRowsOfPortfolio(portfolioName);
        //bring all the classes
        if(this.state.classes.length<1)
        {
            this.props.GetAllClasses();
        }
    }

    toggleClassTable =() =>
    {
        this.setState({showClasses: ! this.state.showClasses});
    }
    toggleShowOptions =() =>
    {
        this.setState({showOptionsCharts: ! this.state.showOptionsCharts});
    }
    toggleSearchControlls =() =>
    {
        this.setState({showSearchControlls: ! this.state.showSearchControlls});
    }
    toggleShowCsamRowsTable =() =>
    {
        this.setState({showCsamRowsTable: ! this.state.showCsamRowsTable});
    }
    toggleChartArea= ()=>{
        this.setState({showChartArea: ! this.state.showChartArea});
    }
    ChangeChartDate = (e,dateField) =>
    {
        this.setState({[dateField]: e.target.value});      
    }

    TopChartSortDateArray =(field)=>{
        let oldArray =(this.state.reportType === "all")? [...this.props.asOfDateList] : [...this.props.asOfDateListMonthOnly];
        let newDateArray=[];
        let fromDate = this.state.fromDate;
        let toDate = this.state.toDate;
        oldArray.map(d=>{
            if(new Date(d).getTime() >= new Date(fromDate).getTime() && 
              new Date(d).getTime() <= new Date(toDate).getTime()){
                newDateArray.push(d);
              }
             
        })
        return newDateArray;
    }

    ChooseCloChartArea=(e)=>{
        let selectElement = e.target;
        let selectedValues = Array.from(selectElement.selectedOptions)
                .map(option => option.value);
        if(selectedValues[0]==='all'){
            this.props.UpdateCloList(this.props.CloList);
        }else{
            this.props.UpdateCloList(selectedValues);
        }
        
        console.log(selectedValues);
    }




    render() { 
        let classTable = null;
        if(this.state.classes.length > 0 && this.state.showClasses)
        {
            classTable = <ClassTable  className="portfolio_classTable" classes={this.state.classes} portfolioName={this.state.portfolioName}/>
        }

        let searchControlls=null;
        if(this.state.showSearchControlls)
        {
            searchControlls = (<div>
                                    <br/>
                                    <img src={calanderImg} alt="calanderImg" /> <SelectCreator  type='selectedAsOdDatePortfolioPage' list={this.props.asOfDateList} />
                                    <br/>
                                    <CsamRowsTable list={this.props.csamRows} asOfDate={this.props.selectedAsOdDate}/>
                                </div>)
        }


        const changeChartData = (e) =>
        {
            this.setState({lineField: e.target.value});
            
        }


        const changeBottomChartData = (e) =>
        {
            this.setState({lineButtomField: e.target.value});
            
        }


        let topPortfolioChart = 
                    <GeneralChart chartType="Line" chrtTableId='TopChartTable' width={'1300'} height={'500'}
                                                            minYaxis={this.state.minYaxis}
                                                            array={this.props.csamRows}
                                                            rowFiledName={'portfolioName'}
                                                            rowsHeaders={[this.props.portfolioName]}
                                                            columnFileName={'asOfDate'}
                                                            columnHeaders={this.TopChartSortDateArray(this.state.lineField)}
                                                            value={this.state.lineField}
                                                            averageStatus={'yes'}
                                                            averageByField={'quantity'} />
        ;

        let chartArea=null;
        if(this.state.showChartArea){

            chartArea=(
                <div className='portfolio_chart_div' >
                    <select onChange={(e)=> changeBottomChartData(e)}>
                        <option value='dailyAssetPrice' selected>Daily Asset Price</option>
                        <option value='warf'>WARF</option>
                        <option value='marketValueSettledCommitmentBook'>Setteled</option>
                        <option value='trancheOC'>Tranche OC</option>
                        <option value='trancheOcCushion'>Tranche OC Cushion</option>
                        <option value='deltaFromSettled'>Price Delta From Setteled</option>
                    </select>
                    <select multiple id="CLOSelectorMulti" onChange={(e)=>this.ChooseCloChartArea(e)}>
                            <option value='all' selected>All</option>
                            {this.props.CloList.sort().map((c,index)=>{
                                return <option key={index+'selectOptionChartArea'}>{c}</option>
                            })}
                    </select>
                    
                    <GeneralChart chartType="Line" chrtTableId='chartAreaTable' width={'1700'} height={'700'}
                                                            minYaxis={this.state.minYaxis}
                                                            array={this.props.csamRows}
                                                            rowFiledName={'issuer_Name'}
                                                            rowsHeaders={this.props.ChartAreaChoosenCLO}
                                                            columnFileName={'asOfDate'}
                                                            columnHeaders={this.TopChartSortDateArray(this.state.lineButtomField)}
                                                            value={this.state.lineButtomField}
                                                            averageStatus={'No'}
                                                            averageByField={'noFiledGroubBy'}
                                                            includeRow_ColumnsHeaders={true}
                                                            />
                                                            
                </div>
            )
        }

        return ( 
            <div>
                <div className="portfolio_Header">  {this.state.portfolioName}    Portfolio </div> 

                <div className='portfolio_portfolio_Top_Chart'>
                    {topPortfolioChart}
                    {/* <Chart data={this.props.csamRows} labels={this.props.asOfDateList} lineField={this.state.lineField}/>   */}
                        <select onChange={(e)=> changeChartData(e)}>
                            <option value='dailyAssetPrice' selected>Daily Asset Price</option>
                            <option value='warf'>WARF</option>
                            <option value='trancheOC'>Tranche OC</option>
                            <option value='trancheOcCushion'>Tranche OC Cushion</option>
                            <option value='deltaFromSettled'>Price Delta From Setteled</option>
                        </select>
                        <label style={{margin:'1%'}} for="fromDate">Start date:</label>
                        <input id="fromDate" type="date"   onChange={(e)=>this.ChangeChartDate(e,'fromDate')}/>
                        <label style={{margin:'1%'}}  for="toDate">End date:</label>
                        <input id="toDate" type="date"  onChange={(e)=>this.ChangeChartDate(e,'toDate')}/>
                        <label style={{margin:'1%'}}  for="toDate">Report Type</label>
                        <select  onChange={(e)=>this.ChangeChartDate(e,'reportType')}>
                            <option value='all' selected>All</option>
                            <option value='monthly'>Monthly Only</option>
                        </select>
                        <img onClick={()=>this.toggleShowOptions()} style={{marginLeft:"1%",marginRight:"1%"}}  src={chartImg} alt="chartImg" />
                        {(this.state.showOptionsCharts)?<span>Min Yaxis<input type="number" onChange={(e)=>this.ChangeChartDate(e,'minYaxis')} /></span>:null}
                </div>
               
                
               
                <div>
                    <button className="portfolio_classTable_btn" onClick={this.toggleClassTable}>
                        Classes Table
                        <img  src={classesImg} alt='classesImg'/>
                    </button>
                    <ReactToExcel className="btn "
                    table="classTable"
                    filename="ClassTable"
                    sheet="Classes"
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />
                </div> 
                
                {classTable}

                <div className="portfolio_searchControlDiv">
                   <button className="portfolio_csamTable_btn" onClick={this.toggleSearchControlls}>Csam Table 
                        <img   src={searchIcon}  alt="searchIcon" /> 
                    </button> 
                    <ReactToExcel className="btn "
                    table="csamRowsTable"
                    filename="CsamTable"
                    sheet="CsamTable"
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />
                   {searchControlls}
                </div>


                <button className="portfolio_CahrtDiv_btn" onClick={this.toggleChartArea}>Graphs <img  src={lineChartImg} alt='lineChartImg' /></button>

                {chartArea}
               
            </div>
            
           


         );
    }
}

const mapStateToProp = state =>
{
    return {
            classes: state.portfolio.classes,
            portfolioName: state.portfolio.portfolioName,
            asOfDateList: state.portfolio.asOfDateList,
            asOfDateListMonthOnly: state.portfolio.asOfDateListMonthOnly,
            csamRows:state.portfolio.csamRows,
            CloList: state.portfolio.CloList,
            ChartAreaChoosenCLO:state.portfolio.ChartAreaChoosenCLO,
            selectedAsOdDate:state.select.selectedAsOdDatePortfolioPage,
            token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        GetAllClasses: () => dispatch(portfolioActions.getAllClasses()),
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName)),
        GetAllAsOfDate:(portfolioName) => dispatch(portfolioActions.getAsOfDateList(portfolioName)),
        GetAsOfDateListMonthOnly:(portfolioName) => dispatch(portfolioActions.getAsOfDateListMonthOnly(portfolioName)),
        GetACsamRowsOfPortfolio:(portfolioName) => dispatch(portfolioActions.getACsamRowsOfPortfolio(portfolioName)),
        UpdateCloList:(choosenCloList)=>dispatch(portfolioActions.udateChoosenCloList(choosenCloList))
    }
}

 
export default connect(mapStateToProp,mapDispatchToProps)(Portfolio);