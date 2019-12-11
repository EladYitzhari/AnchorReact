import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import searchIcon from '../../images/Search-icon.png';
import calanderImg from '../../images/calendar-icon.png';
import './Portfolio.css'
import * as portfolioActions from '../../store/actions/PortfolioActions'
import ClassTable from '../../components/ClassTable/ClassTable';
import SelectCreator from '../../components/selectCreator/selectCreator';


class Portfolio extends Component {
    state = { 
        classes : [...this.props.classes],
        showClasses : false,
        portfolioName: 'HTM-Leverage',
        asOfDateList: [...this.props.asOfDateList],
        showSearchControlls : false
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


    render() { 
        let classTable = null;
        if(this.state.classes.length > 0 && this.state.showClasses)
        {
            classTable = <ClassTable  className="portfolio_classTable" classes={this.state.classes} portfolioName={this.state.portfolioName}/>
        }

        let searchControlls=null;
        if(this.state.showSearchControlls)
        {
            searchControlls = <div><img src={calanderImg} alt="calanderImg" /> <SelectCreator  type='portfolioPageAsOfDate' list={this.props.asOfDateList} /></div>
        }



        return ( 
            <div>
                <div className="portfolio_Header">  {this.state.portfolioName}    Portfolio </div> 
                <div>
                    <button className="btn btn-info portfolio_classTable_btn" onClick={this.toggleClassTable}>Classes Table</button>
                    <ReactToExcel className="btn "
                    table="classTable"
                    filename="ClassTable"
                    sheet="Classes"
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />
                </div> 
                {classTable}

                <div className="portfolio_searchControlDiv">
                    <img className="btn btn-info" src={searchIcon}  alt="searchIcon" onClick={this.toggleSearchControlls}/>
                   {searchControlls}
                </div>



               
            </div>
            
           


         );
    }
}

const mapStateToProp = state =>
{
    return {
            classes: state.portfolio.classes,
            portfolioName: state.portfolio.portfolioName,
            asOfDateList: state.portfolio.asOfDateList
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        GetAllClasses: () => dispatch(portfolioActions.getAllClasses()),
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName)),
        GetAllAsOfDate:(portfolioName) => dispatch(portfolioActions.getAsOfDateList(portfolioName))
    }
}

 
export default connect(mapStateToProp,mapDispatchToProps)(Portfolio);