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



class Portfolio extends Component {
    state = { 
        classes : [...this.props.classes],
        showClasses : false,
        portfolioName: 'HTM-Leverage',
        asOfDateList: [...this.props.asOfDateList],
        showSearchControlls : false,
        csamRows:[...this.props.csamRows],
        showCsamRowsTable:false,
        lineFiled:'dailyAssetPrice',
        lineButtomFiled:'dailyAssetPrice',
        ChartArea:false
 
     }

    componentDidMount =() => {
        //deal with the portfolio name
        let portfolioName = String(this.props.location.hash).replace('#','');
        //insert into the general state
        this.props.ChangePortfolioName(portfolioName);
        //update the local state
        this.setState({ portfolioName: portfolioName});
        //bring all the AS OF DATE of the portfolio
        this.props.GetAllAsOfDate(portfolioName);
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
            this.setState({lineFiled: e.target.value});
            
        }

        const changeBottomChartData = (e) =>
        {
            this.setState({lineButtomFiled: e.target.value});
            
        }

        let topPortfolioChart = 
                    <GeneralChart chartType="Line" chrtTableId='TopChartTable' width={'1300'} height={'500'}
                                                             array={this.props.csamRows}
                                                            rowFiledName={'portfolioName'}
                                                            rowsHeaders={[this.props.portfolioName]}
                                                            columnFileName={'asOfDate'}
                                                            columnHeaders={[...this.props.asOfDateList]}
                                                            value={this.state.lineFiled} 
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
                    </select>
                    <GeneralChart chartType="Line" chrtTableId='chartAreaTable' width={'1700'} height={'700'}
                                                            array={this.props.csamRows}
                                                            rowFiledName={'issuer_Name'}
                                                            rowsHeaders={globalFunction.uniqArrayFromTable(this.props.csamRows,'issuer_Name')}
                                                            columnFileName={'asOfDate'}
                                                            columnHeaders={[...this.props.asOfDateList]}
                                                            value={this.state.lineButtomFiled}
                                                            averageStatus={'No'}
                                                            averageByField={'noFiledGroubBy'}/>

                </div>
            )
        }

        return ( 
            <div>
                <div className="portfolio_Header">  {this.state.portfolioName}    Portfolio </div> 

                <div className='portfolio_portfolio_Top_Chart'>
                    {topPortfolioChart}
                    {/* <Chart data={this.props.csamRows} labels={this.props.asOfDateList} lineFiled={this.state.lineFiled}/>   */}
                        <select onChange={(e)=> changeChartData(e)}>
                            <option value='dailyAssetPrice' selected>Daily Asset Price</option>
                            <option value='warf'>WARF</option>
                            <option value='trancheOC'>Tranche OC</option>
                            <option value='trancheOcCushion'>Tranche OC Cushion</option>
                        </select>
                        
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
            csamRows:state.portfolio.csamRows,
            selectedAsOdDate:state.select.selectedAsOdDatePortfolioPage
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        GetAllClasses: () => dispatch(portfolioActions.getAllClasses()),
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName)),
        GetAllAsOfDate:(portfolioName) => dispatch(portfolioActions.getAsOfDateList(portfolioName)),
        GetACsamRowsOfPortfolio:(portfolioName) => dispatch(portfolioActions.getACsamRowsOfPortfolio(portfolioName))
    }
}

 
export default connect(mapStateToProp,mapDispatchToProps)(Portfolio);