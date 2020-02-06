import React, { Component } from 'react';
import '../Css/NAVPage.css'
import {connect} from 'react-redux';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import * as portfolioActions from '../../store/actions/PortfolioActions';
import NavCsamRowTable from '../../components/Js/NavCsamRowTable'
import NavDetailsTable from '../../components/Js/NavDetailsTable';
class NavPage extends Component {
    state = { 
        navMonth:'01',
        navYear:'2019',
        portfolioName:this.props.portfolioName,
        showCsamTable:false
     }

    componentDidMount=() => {
        ///Check if token exist, if not send the client to the login page
        if(this.props.token === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }
        this.props.GetACsamRowsOfPortfolio('HTM-Leverage');
        this.props.ChangePortfolioName('HTM-Leverage');
    }

    toggleCsamTable=()=>{
        this.setState({showCsamTable: !this.state.showCsamTable});
        this.props.GetAllAssetAmountForAllThePortfolios(this.state.navMonth,this.state.navYear);
        
    }

    changePortfolio = (e) =>{
        let portfolioName =e.target.value;
        if(portfolioName !== this.state.portfolioName){         
            this.props.GetACsamRowsOfPortfolio(portfolioName);
            this.props.ChangePortfolioName(portfolioName);
        }
        this.setState({portfolioName:portfolioName});
    }
    
    setVarInState =(e,key)=>{
        this.setState({[key]:e.target.value});
        this.setState({ showCsamTable:false});
    }
    render() { 

        let csamTable = null;
        if(this.state.showCsamTable){
            console.log(this.state);
            csamTable =  <NavCsamRowTable csamRows={this.props.CsamRows} dateDetails={this.state}/>
        }

        return ( 
            <div className='NAVPage_mainDiv'>

            <table id="controlTable" className="table">
                        <tr>
                            <td>Portfolio</td>
                            <td>Month</td>
                            <td>Year</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><select  id="navPortfolio" onChange={(e)=>this.changePortfolio(e)}>
                                <option value="HTM">HTM</option>
                                <option value="HTM-Leverage" selected>HTM-Leverage</option>
                                <option value="Active">Active</option>
                            </select></td>
                            <td> <select  id="navMonth" onChange={(e)=>this.setVarInState(e,'navMonth')}>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select></td>
                            <td><select  id="navYear" onChange={(e)=>this.setVarInState(e,'navYear')}>>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                </select></td>
                                <td><button class="btn btn-info btn-lg" onClick={this.toggleCsamTable}>Calculate NAV Parameters</button></td>
                        </tr>
        
                    </table>
                    <NavDetailsTable />
                   {csamTable}
            </div>
         );
    }
}

const mapStateToProp = state =>
{
    return {
            CsamRows:state.portfolio.csamRows,
            portfolioName: state.portfolio.portfolioName,
            tzurNav: state.portfolio.tzurNav,
            token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName)),    
        GetACsamRowsOfPortfolio:(portfolioName) => dispatch(portfolioActions.getACsamRowsOfPortfolio(portfolioName)),
        GetAllAssetAmountForAllThePortfolios:(month,year)=> dispatch(portfolioActions.getAllPortfoliosAssets(month,year))
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(NavPage);