import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Css/UploadTable.css'
import * as DFunctions from '../../components/Functions/dateFunctions'
import * as gf from '../Functions/globalFunction'; 

class UploadTable extends Component {
    state = {  }

    generateId=(name,isin,asOfDate)=>
    {
        if(name.search("HTM Le") !== -1)
        {
            return 'HTM-Leverage-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
        }else if(name.search("HTM") !== -1){
            return 'HTM-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
        }else{
            return 'Active-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
        }
    }

    getPortfolioName=(name)=>
    {
        if(name.search("HTM Le") !== -1)
        {
            return 'HTM-Leverage';
        }else if(name.search("HTM") !== -1){
            return 'HTM';
        }else{
            return 'Active';
        }
    }
    addCommasToNum=(num)=>
    {
        return Number(num).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() { 
        return ( 
            <table className='table' id='uploadCsamTable'>
                <thead className='uploadTable_th'>
                 
                  {this.props.rows.map((r,index)=>{
                          if(index === 0){
                            return (
                                        gf.tableRowCreator(r)
                                       
                                   )          
                      }})}
                  
                </thead>
                <tbody>
                      {this.props.rows.map((r,index)=>{
                          if(index !== 0){
                            return (
                                gf.tableRowCreator(r)
                            )          
                      }})}
                    </tbody>
            </table>
         );
    }
}

const mapStateToProp = state =>
{
    return {
            rows: state.excel.rows,

        }
}
 

 
export default connect(mapStateToProp,)(UploadTable);