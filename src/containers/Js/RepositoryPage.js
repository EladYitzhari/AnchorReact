import React, { Component } from 'react';
import '../Css/RepositoryPage.css'
import {connect} from 'react-redux';
import * as repositoryAction from '../../store/actions/RepositoryActions'
import * as globalFun from '../../components/Functions/globalFunction'
import Spinner from '../../components/Js/Spinner';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';

class RepositoryPage extends Component {
    state = { 
        showTable:false,
        CsamRows:[],
        sortAsOfDate:'all'
     }

    componentDidMount=()=>{
        this.props.GetAllAsOfDates();
        this.props.GetAllCsamRows();
        setTimeout(() => {
            this.setState({CsamRows:[...this.props.CsamRows]});
            console.log("success bring all csam rows");
        }, 2000);
    }


    // ToggleTable=()=>{
    //     this.setState({showTable: !this.state.showTable});
    // }
    setAsOfDate = (e) =>{
      this.setState({sortAsOfDate:e.target.value});
    }

    render() { 

        let table=null;
        if(this.state.CsamRows.length !== 0){
            table =(
                <table className="table table-hover" id='repositoryTable'>
                <thead style={{backgroundColor:'rgb(6, 117, 168)',fontSize:'120%'}}>{globalFun.extractHeadersToTh(this.state.CsamRows[0])}</thead>
                <tbody>
                {this.state.CsamRows.filter(a=>{
                    return a.isin !== null && 
                            (this.state.sortAsOfDate==='all')?true:a.asOfDate ===  this.state.sortAsOfDate}).map(a => {
                    return (
                        globalFun.tableRowCreator(a)
                    )
                })}
                </tbody>
            </table>
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
                                <select className='form-control' style={{fontSize:'80%'}} onChange={(e)=>this.setAsOfDate(e)}>
                                    <option value='all' selected>All</option>
                                {this.props.asOfDateList.filter(a=>{return a!== null}).map(a=>{
                                    return <option key={a}>{a}</option>
                                })}
                                </select>
                            </td>
                            <td> <ReactToExcel className="btn "
                                table='repositoryTable'
                                filename="Repository Report"
                                sheet={this.state.sortAsOfDate}
                                buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                                />
                             </td>
                            <td></td>
                        </tr>
        
                    </table>
                    {table}
              




            </React.Fragment>
         );
    }
}
const mapStateToProp = state =>
{
    return {
            CsamRows:state.repository.csamRows,
            asOfDateList:state.repository.allAsOfDates
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