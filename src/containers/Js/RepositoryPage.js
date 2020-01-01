import React, { Component } from 'react';
import '../Css/RepositoryPage.css'
import {connect} from 'react-redux';
import * as repositoryAction from '../../store/actions/RepositoryActions'
import * as globalFun from '../../components/Functions/globalFunction'
import Spinner from '../../components/Js/Spinner';


class RepositoryPage extends Component {
    state = { 
        showTable:false,
        CsamRows:[]
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
    

    render() { 

        let table=null;
        if(this.state.CsamRows.length !== 0){
            table = globalFun.createTableFromArray(this.state.CsamRows.filter(a=>{return a.isin !== null})) ;
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
                                <select className='form-control'>
                                {this.props.asOfDateList.filter(a=>{return a!== null}).map(a=>{
                                    return <option key={a}>{a}</option>
                                })}
                                </select>
                            </td>
                            <td><button className="btn btn-info btn-lg" >Show CSAM Report</button></td>
                            <td><button className="btn btn-success btn-lg" >Bring All Reports</button></td>
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