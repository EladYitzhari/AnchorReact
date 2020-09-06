import React, { Component } from 'react';
import '../Css/RepositoryPage.css'
import {connect} from 'react-redux';
import * as repositoryAction from '../../store/actions/RepositoryActions'
import * as globalFun from '../../components/Functions/globalFunction'
import Spinner from '../../components/Js/Spinner';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import ExportCSV from '../../components/Js/ExportCSV'
import CsamRowCard from '../../components/Js/CsamRowCard';
import editImg from '../../images/edit-icon.png';

class RepositoryPage extends Component {
    state = { 
        showSpinner:false,
        showTable:false,
        CsamRows:[],
        sortAsOfDates:['all'],
        exportJson:[],
        showEditCard:true,
        csamRowEdit:null
     }

    componentDidMount=()=>{
       ///Check if token exist, if not send the client to the login page
       if(this.props.token === null && localStorage.getItem("token") === null){
        alert("Login details didn't found, Please login again");
        this.props.history.push('/Auth')
        }

        this.props.GetAllAsOfDates();
        this.props.getAllCsamRowsByAsOfDate("2020-08-31");

        setTimeout(() => {

            this.setState({CsamRows:[...this.props.CsamRows]});
            this.setState({exportJson:[...this.props.CsamRows]});
            
        }, 2000);
    }



    setAsOfDate = (e) =>{
      this.setState({showSpinner:true})
      this.setState({sortAsOfDates:e.target.value});
      this.props.getAllCsamRowsByAsOfDate(e.target.value);
      setTimeout(() => {
        this.setState({showSpinner:false})
      }, 2000);
    }


    
    render() { 

 
        let spinner=null;
        if(this.state.showSpinner){
            spinner=<Spinner />
        }

        let table=null;
        
            //create the table
            table =(
               <React.Fragment>
                <thead style={{backgroundColor:'rgb(6, 117, 168)',fontSize:'120%'}}>{globalFun.extractHeadersToTh({...this.props.CsamRows[0],"actions":"test"})}</thead>
                <tbody>
                {
                        this.props.CsamRows.filter(a=>{return a.isin !== null }).map(a => {
                        return (
                            globalFun.tableRowCreator(a)
                        )
              
                })}
                </tbody>
                </React.Fragment>
            ) 
            
       
       
        return ( 
            <React.Fragment>
                <div className='repository_Header'>
                    Welcome to the repository Page
                </div>
                
                    <table id="controlTable" className="table">
                        <tr>
                            <td>As of Date</td>
                            <td>
                                <select className='form-control' style={{fontSize:'80%'}} onChange={(e)=>this.setAsOfDate(e)}>
                                {this.props.asOfDateList.filter(a=>{return a!== null}).map(a=>{
                                    return <option key={a}>{a}</option>
                                })}
                                </select>
                                {spinner}
                            </td>
                            <td> 
                            <ExportCSV csvData={     
                                    this.props.CsamRows.filter(a=>{return a.isin !== null })
                                } fileName={this.state.sortAsOfDates} />
                             </td>
                            <td></td>
                        </tr>
        
                    </table>

                           
                    <table className="table table-hover" id='repositoryTable'>
                    {table}
                    </table>




            </React.Fragment>
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
        GetAllCsamRows:() => dispatch(repositoryAction.getAllCsamRows()),
        GetAllAsOfDates:() => dispatch(repositoryAction.getAllAsOfDates()),
        getAllCsamRowsByAsOfDate:(asOfDate)=>dispatch(repositoryAction.getAllCsamRowsByAsOfDate(asOfDate))
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(RepositoryPage);