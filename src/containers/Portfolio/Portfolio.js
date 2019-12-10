import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Portfolio.css'
import * as portfolioActions from '../../store/actions/PortfolioActions'
import ClassTable from '../../components/ClassTable/ClassTable';


class Portfolio extends Component {
    state = { 
        classes : [...this.props.classes],
        showClasses : true,
        portfolioName: this.props.portfolioName
     }

    componentDidMount =() => {
        this.props.ChangePortfolioName(this.props.location.hash);
        console.log(this.props);
        this.props.GetAllClasses();
    }

    

    render() { 
        let classTable = null;
        if(this.state.classes.length > 0 && this.state.showClasses)
        {
            classTable = <ClassTable className="portfolio_classTable" classes={this.state.classes}/>
        }



        return ( 
            <div>
                <div className="portfolio_Header">  {this.state.portfolioName}    Portfolio </div>               
                {classTable}
            </div>


         );
    }
}

const mapStateToProp = state =>
{
    return {
            classes: state.portfolio.classes,
            portfolioName: state.portfolio.portfolioName
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        GetAllClasses: () => dispatch(portfolioActions.getAllClasses()),
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName))
    }
}

 
export default connect(mapStateToProp,mapDispatchToProps)(Portfolio);