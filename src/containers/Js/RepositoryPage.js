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
        this.props.GetAllCsamRows();
        setTimeout(() => {
            this.setState({CsamRows:[...this.props.CsamRows]});
            this.setState({exportJson:[...this.props.CsamRows]});
            console.log("success bring all csam rows");
        }, 2000);
    }


    // ToggleTable=()=>{
    //     this.setState({showTable: !this.state.showTable});
    // }
    setAsOfDate = (e) =>{
        let selectElement = e.target;
        let selectedValues = Array.from(selectElement.selectedOptions)
                .map(option => option.value);
        console.log("list: "+selectedValues)
      this.setState({sortAsOfDates:selectedValues});
    }


    
    render() { 

 


        let table=null;
        if(this.state.CsamRows.length !== 0){
            //create the table
            table =(
               <React.Fragment>
                <thead style={{backgroundColor:'rgb(6, 117, 168)',fontSize:'120%'}}>{globalFun.extractHeadersToTh({...this.state.CsamRows[0],"actions":"test"})}</thead>
                <tbody>
                {(this.state.sortAsOfDates[0]==='all')?
                        this.state.CsamRows.filter(a=>{return a.isin !== null }).map(a => {
                        return (
                            globalFun.tableRowCreator(a)
                        )
                    }):this.state.sortAsOfDates.map(date=>{
                        return (this.state.CsamRows.filter(a=>{return a.isin !== null && a.asOfDate === date}).map(a => {
                                return (
                                    globalFun.tableRowCreator(a)
                                )
                        }))
                    })
                   
                }
                </tbody>
                </React.Fragment>
            ) 
            
        }else{
            table = <div style={{width:'100%',textAlign:'center'}}><Spinner /></div>
        }
       
        return ( 
            <React.Fragment>
                <div className='repository_Header'>
                    Welcom to the repository Page
                </div>
                    <table id="controlTable" className="table">
                        <tr>
                            <td>As of Date</td>
                            <td>
                                <select className='form-control' style={{fontSize:'80%'}} multiple onChange={(e)=>this.setAsOfDate(e)}>
                                    <option value='all' selected>All</option>
                                {this.props.asOfDateList.filter(a=>{return a!== null}).map(a=>{
                                    return <option key={a}>{a}</option>
                                })}
                                </select>
                            </td>
                            <td> 
                            <ExportCSV csvData={
                                    (this.state.sortAsOfDates[0]==='all')?
                                    this.state.CsamRows.filter(a=>{return a.isin !== null })
                                    :this.state.CsamRows.filter(a=>{return a.isin !== null && this.state.sortAsOfDates.indexOf(a.asOfDate) !== -1})
                            
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
        GetAllAsOfDates:() => dispatch(repositoryAction.getAllAsOfDates())
    }
}
export default connect(mapStateToProp,mapDispatchToProps)(RepositoryPage);