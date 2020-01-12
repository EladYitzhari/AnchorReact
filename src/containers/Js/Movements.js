import React, { Component } from 'react';
import '../Css/Movements.css'
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import ReactToExcel from 'react-html-table-to-excel';
import * as globalFun from '../../components/Functions/globalFunction';
import {connect} from 'react-redux';
import * as movementActions from '../../store/actions/MovementAction';
import MovemetsTable from '../../components/Js/MovementsTable';
import Spinner from '../../components/Js/Spinner';


class Movements extends Component {
    state = { 
        sortBy:'all',
        selectedClass:'USD-A',
        selectedPortfolio:'HTM-Leverage',
        fromDate:'2000-01-01',
        toDate:'2050-01-01',
        tableArray:[],
        showSpinner:false
     }


    componentDidMount=()=>{
        this.props.GetAllMovements();
        this.setState({'showSpinner':true});
        setTimeout(() => {
            this.sortTheMovesArray();
            this.setState({'showSpinner':false});
        }, 1000);

    }

    sortTheMovesArray=()=>{
       let theArray = (this.state.sortBy === 'all')?this.props.movements:
        (this.state.sortBy === 'byClass')?
        this.props.movements.filter(m=>{return m.className === this.state.selectedClass}):
        this.props.movements.filter(m=>{return this.getPortfolioFromIsin(m.isin) === this.state.selectedPortfolio});

        theArray = theArray.filter(m=>{return new Date(m.effectiveDate).getTime() >= new Date(this.state.fromDate).getTime()
             && new Date(m.effectiveDate).getTime() <= new Date(this.state.toDate).getTime()});
        this.setState({'tableArray':theArray});

    }
    changeParam =(e,key)=>{
        this.setState({[key]:e.target.value});
        this.setState({'showSpinner':true});
        setTimeout(() => {
            this.sortTheMovesArray();
            this.setState({'showSpinner':false});
        }, 2000);
        
    }

    getPortfolioFromIsin=(isin)=>{
        let portfolio ='';
         globalFun.clssesIsins.map(m=>{
             if(m.isin === isin){
                portfolio = m.portfolio;
             }
         });
         return portfolio;
    }
    selectByOperation = (e)=>
    {
        let selectValue = e.target.value;
        if(selectValue == "byClass")
        {
            document.getElementById("classSelectorShowTable").style.display = "block";
            document.getElementById("byClassHeader").style.display = "block";
            document.getElementById("portfolioSelector").style.display = "none";
            document.getElementById("byPortfolioHeader").style.display = "none";
            
        }else if(selectValue == "byPortfolio"){
            document.getElementById("portfolioSelector").style.display = "block";
            document.getElementById("byPortfolioHeader").style.display = "block";
            document.getElementById("classSelectorShowTable").style.display = "none";
            document.getElementById("byClassHeader").style.display = "none";
        }else{
            //nither class/portfolio chosen
            document.getElementById("portfolioSelector").style.display = "none";
            document.getElementById("byPortfolioHeader").style.display = "none";
            document.getElementById("classSelectorShowTable").style.display = "none";    
            document.getElementById("byClassHeader").style.display = "none";

        }
    }
    render() { 

        let movementTable = null;
        if(!this.state.showSpinner){
            movementTable = <MovemetsTable id='movementsTable' movements={this.state.tableArray} />
        }else{
            movementTable = <Spinner></Spinner>
        }

        return ( 
            <div>
                  <div id="header">
                        Movement Page

                    </div>

            <div id="showMovmentControlDiv" style={{width: "100%",textAlign:"center"}}>
                <table id="showMovmentControlTable">
                    <tr>
                        <th>Show movements by</th>
                        <th id="byClassHeader"  style={{display: "none"}}>By Class</th>
                        <th id="byPortfolioHeader"  style={{display: "none"}}>By Portfolio</th>
                        <th> From -Effective Date</th>
                        <th>through</th>
                        <th></th>
                        <th>Download History</th>
                    </tr>
                    <tr>
                        <td>
                            <select id="movementBySelector" onChange={(e)=>{this.selectByOperation(e);this.changeParam(e,'sortBy')}}>
                                <option value="all">All Movements</option>
                                <option value="byPortfolio">By Portfolio</option>
                                <option value="byClass">By Class</option>
                            </select>
                        </td>
                        <td id="classSelectorShowTable"  style={{display: "none"}}>
                            <select  id="classShowSelector" onChange={(e)=>this.changeParam(e,'selectedClass')}>
                                {globalFun.clssesIsins.map((x,index)=>{
                                    return <option value={globalFun.clssesIsins[index].class} key={index+'classMovemet'}>{globalFun.clssesIsins[index].class}</option>
                                })}
                            </select>
                        </td>
                        <td id="portfolioSelector"  style={{display: "none"}} onChange={(e)=>this.changeParam(e,'selectedPortfolio')}>
                                <select  id="portfolioShowSelector">
                                    <option value="HTM-Leverage">HTM-Leverage</option>
                                    <option value="HTM">HTM</option>
                                    <option value="Active">Active</option>
                                </select>
                        </td>
                        <td>
                            <input type="date" id="fromDateShowControl" onChange={(e)=>this.changeParam(e,'fromDate')}/>
                        </td>
                        <td>
                            <input type="date" id="throughDateShowControl" onChange={(e)=>this.changeParam(e,'toDate')}/>
                        </td>
                        <td>
                            <button class="btn btn-success btn-lg" onclick="getAllMovementsList()">Show all Class moves</button>
                        </td>
                        <td>
                        <ReactToExcel className="btn "
                            table="movementsTable"
                            filename="Movements Table"
                            sheet="Movements"
                            buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                            />
                        </td>
                        <td>

                        </td>
                    </tr>
                </table>
            </div>

            <div id="movementTableDiv">
               {movementTable}
            </div>


            </div>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
            movements: state.movements.movements
        }
}
const mapDispatchToProps = dispatch =>
{
    return {
        GetAllMovements: () => dispatch(movementActions.getAllMovements())

    }
}


export default connect(mapStateToProp,mapDispatchToProps)(Movements);