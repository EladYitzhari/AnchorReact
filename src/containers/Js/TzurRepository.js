import React, { Component } from 'react';
import '../Css/TzurRepository.css';
import {connect} from 'react-redux';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import * as tzurAction from '../../store/actions/TzurActions'
import generatIcon from '../../images/Generate-tables-icon.png'



class TzurRepository extends Component {
    state = { 
        selectedPortfolio:'all',
        fromDate:'2000-01-01',
        toDate:'2050-01-01'
     }

    componentDidMount=()=>{
        this.props.getAllTzurArray();
      }

      changeParam =(e,key)=>{
        this.setState({[key]:e.target.value});
      }


    render() { 
        return ( 
            <React.Fragment>
            <div className="tzurRepository_header">
                Tzur Repository
            </div>
            <div className="tzurRepository_controllerArea">
                <table className="table tzurRepository_controllerTable">
                    <thead>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Report</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <td >
                            <input type="date" id="fromDateShowControl"  onChange={(e)=>this.changeParam(e,'fromDate')}/>
                        </td>
                        <td >
                            <input type="date" id="throughDateShowControl"  onChange={(e)=>this.changeParam(e,'toDate')}/>
                        </td>
                        <td>
                            <select className="btn btn-info" style={{fontSize:'100%'}}>
                                <option value='all'>All</option>
                                <option value='entire'>Entire</option>
                                <option value='HTM-Leverage'>HTM-Leverage</option>
                                <option value='HTM'>HTM</option>
                                <option value='Active'>Active</option>
                                <option value='cash'>Cash</option>
                            </select>
                        </td>
                        <td><img src={generatIcon} alt="generatIcon" /></td>
                    </tbody>
                </table>
            </div>





            </React.Fragment>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
            tzurArray: state.tzur.tzur
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        getAllTzurArray: () => dispatch(tzurAction.getAllTzurArray())
    }
}



export default connect(mapStateToProp,mapDispatchToProps)(TzurRepository);