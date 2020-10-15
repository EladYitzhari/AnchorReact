import React, { Component } from 'react';
import '../Css/NAVPage.css'
import {connect} from 'react-redux';
import * as tzurAction from '../../store/actions/TzurActions'
import * as portfolioActions from '../../store/actions/PortfolioActions';
import NavCsamRowTable from '../../components/Js/NavCsamRowTable'
import NavDetailsTable from '../../components/Js/NavDetailsTable';
import * as tzurFunc from '../../components/Functions/tzurForNavFunctions';
import { readyException } from 'jquery';

class NavPage extends Component {
    state = { 
        navMonth:'01',
        navYear:'2019',
        portfolioName:this.props.portfolioName,
        showCsamTable:false,
        mode:"regular",
        libor:0,
        predictedMonth:"-",
        predictedYear:"-"
     }

    componentDidMount=() => {
        ///Check if token exist, if not send the client to the login page
        if(this.props.token === null && localStorage.getItem("token") === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }
        this.props.GetACsamRowsOfPortfolio('HTM-Leverage');
        this.props.ChangePortfolioName('HTM-Leverage');
        this.props.getAllTzurArray();
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
        console.log(this.state)
    }
    render() { 

        let csamTable = null;
        if(this.state.showCsamTable){
            console.log(this.state);
            csamTable =  <NavCsamRowTable csamRows={this.props.CsamRows} dataDetails={this.state}/>
        }

        let navDetailsTable= <NavDetailsTable portfolioName={this.props.portfolioName}
                                 tzurData={tzurFunc.createTzurNavDetails(this.props.tzurArray,this.state.navMonth,this.state.navYear,this.props.portfolioName)}/>;
        return ( 
            <div className='NAVPage_mainDiv'>

            <table id="controlTable" className="table">
                        <tr>
                            <td>Portfolio</td>
                            <td>Month</td>
                            <td>Year</td>
                            <td>Mode</td>
                            {(this.state.mode !== "prediction")?null:(
                                <React.Fragment>
                                <td>Libor</td>
                                <td>Pre Month</td>
                                <td>Pre Year</td>
                                </React.Fragment>
                            )}
                            <td></td>
                        </tr>
                        <tr>
                            <td><select  id="navPortfolio" onChange={(e)=>this.changePortfolio(e)}>
                                <option value="HTM">HTM</option>
                                <option value="HTM-Leverage" selected>HTM-Leverage</option>
                                <option value="Active">Active</option>
                                <option value="IG">IG</option>
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
                            <td><select  id="navYear" onChange={(e)=>this.setVarInState(e,'navYear')}>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                </select></td>
                                <td><select  id="mode" onChange={(e)=>this.setVarInState(e,'mode')} >
                                    <option value="regular">Regular</option>
                                    <option value="prediction">Prediction By</option>
                                </select></td>
                                {(this.state.mode !== "prediction")?null:(<React.Fragment>
                                            <td><input className="form-input" type="number" step="0.01" id="libor" onChange={(e)=>this.setVarInState(e,'libor')}/></td>
                                            <td> <select  id="predictedMonth" onChange={(e)=>this.setVarInState(e,'predictedMonth')}>
                                                    <option value="-">-</option>
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
                                           
                                            <td>
                                                <select  id="predictedYear" onChange={(e)=>this.setVarInState(e,'predictedYear')}>
                                                    <option value="-">-</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                </select>
                                            </td>
                                            </React.Fragment>
                                            )}
                                <td><button className="btn btn-info btn-lg" onClick={this.toggleCsamTable}>Calculate NAV Parameters</button></td>
                        </tr>
        
                    </table>
   
                    {navDetailsTable}
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
            token:state.auth.token,
            tzurArray: state.tzur.tzur
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        ChangePortfolioName: (portfolioName) => dispatch(portfolioActions.changePortfolioName(portfolioName)),    
        GetACsamRowsOfPortfolio:(portfolioName) => dispatch(portfolioActions.getACsamRowsOfPortfolio(portfolioName)),
        GetAllAssetAmountForAllThePortfolios:(month,year)=> dispatch(portfolioActions.getAllPortfoliosAssets(month,year)),
        getAllTzurArray: () => dispatch(tzurAction.getAllTzurArray())
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(NavPage);