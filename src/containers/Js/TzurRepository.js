import React, { Component } from 'react';
import '../Css/TzurRepository.css';
import {connect} from 'react-redux';
import * as tzurAction from '../../store/actions/TzurActions'
import generatIcon from '../../images/Generate-tables-icon.png'
import TzurRepositoryTable from '../../components/Js/TzurRepositoryTable'
import ExportCSV from '../../components/Js/ExportCSV'


class TzurRepository extends Component {
    state = { 
        selectedPortfolio:'all',
        fromDate:'2000-01-01',
        toDate:'2050-01-01',
        showTable:false
     }

    componentDidMount=()=>{
        ///Check if token exist, if not send the client to the login page
        if(this.props.token === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }
        this.props.getAllTzurArray();
      }

      changeParam =(e,key)=>{
        this.setState({[key]:e.target.value});
      }

      toggleTable=()=>{
          this.setState({showTable: !this.state.showTable});
      }



    render() { 

        let fullTable =null;
        if(this.state.showTable)
        {
            fullTable = <TzurRepositoryTable tzurArray={
                (this.state.selectedPortfolio === 'all')?this.props.tzurArray.filter(f=>{return (
                new Date(f.year+"-"+f.month+"-01") >= new Date(this.state.fromDate) && 
                new Date(f.year+"-"+f.month+"-01") <= new Date(this.state.toDate)
                )}):this.props.tzurArray.filter(f=>{return (
                    new Date(f.year+"-"+f.month+"-01") >= new Date(this.state.fromDate) && 
                    new Date(f.year+"-"+f.month+"-01") <= new Date(this.state.toDate) &&
                f.reportType === this.state.selectedPortfolio)})}/>
        }

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
                            <select className="btn btn-info" style={{fontSize:'100%'}} onChange={(e)=>this.changeParam(e,'selectedPortfolio')}>
                                <option value='all'>All</option>
                                <option value='entire'>Entire</option>
                                <option value='HTM-Leverage'>HTM-Leverage</option>
                                <option value='HTM'>HTM</option>
                                <option value='Active'>Active</option>
                                <option value='cash'>Cash</option>
                            </select>
                        </td>
                        <td><img src={generatIcon} alt="generatIcon" onClick={()=>this.toggleTable()}/></td>
                        <td>  <ExportCSV csvData={
                                    this.props.tzurArray
                                } fileName={"Tzur Table"} /></td>
                    </tbody>
                </table>
            </div>
            {fullTable}




            </React.Fragment>
         );
    }
}
 

const mapStateToProp = state =>
{
    return {
            tzurArray: state.tzur.tzur,
            token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        getAllTzurArray: () => dispatch(tzurAction.getAllTzurArray())
    }
}



export default connect(mapStateToProp,mapDispatchToProps)(TzurRepository);