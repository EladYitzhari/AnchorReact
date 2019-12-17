import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Css/UploadTable.css'
import * as DFunctions from '../../components/Functions/dateFunctions'


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
                <thead>
                  <tr className='uploadTable_th'>
                  {this.props.rows.map((r,index)=>{
                          if(index === 0){
                            return (<React.Fragment>
                                        <th>Id</th>
                                        <th>Portfolio</th>
                                        <th>{r[0]}</th> <th>{r[1]}</th><th>{r[2]}</th><th>{r[3]}</th>
                                        <th>{r[4]}</th> <th>{r[5]}</th><th>{r[6]}</th><th>{r[7]}</th>
                                        <th>{r[8]}</th> <th>{r[9]}</th><th>{r[10]}</th><th>{r[11]}</th>
                                        <th>{r[12]}</th> <th>{r[13]}</th><th>{r[14]}</th><th>{r[15]}</th>
                                         <th>{r[16]}</th> <th>{r[17]}</th><th>{r[18]}</th><th>{r[19]}</th>
                                        <th>{r[20]}</th> <th>{r[21]}</th><th>{r[22]}</th><th>{r[23]}</th>
                                        <th>{r[24]}</th> <th>{r[25]}</th><th>{r[26]}</th><th>{r[27]}</th> 
                                        <th>{r[28]}</th> <th>{r[29]}</th><th>{r[30]}</th><th>{r[31]}</th>
                                        <th>{r[32]}</th> <th>{r[33]}</th><th>{r[34]}</th><th>{r[35]}</th>
                                        <th>{r[36]}</th> <th>{r[37]}</th><th>{r[38]}</th><th>{r[39]}</th>
                                    </React.Fragment>    
                                   )          
                      }})}
                  </tr>
                </thead>
                <tbody>
                      {this.props.rows.map((r,index)=>{
                          if(index !== 0){
                            return (<tr key={'rows'+index}>
                                        <td>{this.generateId(r[0],r[4],r[39])}</td>
                                        <td>{this.getPortfolioName(r[0])}</td>
                                        <td>{r[0]}</td> <td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                                        <td>{r[4]}</td> <td>{r[5]}</td><td>{r[6]}</td><td>{this.addCommasToNum(r[7])}</td>
                                        <td>{this.addCommasToNum(r[8])}</td> <td>{this.addCommasToNum(r[9])}</td><td>{this.addCommasToNum(r[10])}</td><td>{this.addCommasToNum(r[11])}</td>
                                        <td>{r[12]}</td> <td>{r[13]}</td><td>{r[14]}</td><td>{r[15]}</td>
                                         <td>{r[16]}</td> <td>{r[17]}</td><td>{r[18]}</td><td>{DFunctions.convertDateToSqlDate(r[19])}</td>
                                        <td>{DFunctions.convertDateToSqlDate(r[20])}</td> <td>{DFunctions.convertDateToSqlDate(r[21])}</td>
                                        <td>{DFunctions.convertDateToSqlDate(r[22])}</td><td>{r[23]}</td>
                                        <td>{r[24]}</td> <td>{this.addCommasToNum(r[25])}</td><td>{this.addCommasToNum(r[26])}</td><td>{r[27]}</td> 
                                        <td>{r[28]}</td> <td>{r[29]}</td><td>{r[30]}</td><td>{r[31]}</td>
                                        <td>{r[32]}</td> <td>{r[33]}</td><td>{r[34]}</td><td>{r[35]}</td>
                                        <td>{r[36]}</td> <td>{DFunctions.convertDateToSqlDate(r[37])}</td><td>{r[38]}</td>
                                        <td>{DFunctions.convertDateToSqlDate(r[39])}</td>
                                        
                                    </tr>)          
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