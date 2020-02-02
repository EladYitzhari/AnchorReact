import React, { Component } from 'react';
import * as globFun from '../../components/Functions/globalFunction';
import '../Css/TzurRepositoryTable.css'


class TzurRepositoryTable extends Component {
    state = {  }
    render() { 
        return ( 
            <table className=" tzurRepositoryTable table table-hover" style={{width:"70%",marginLeft:"15%",marginTop:"3%"}}>
                <thead style={{backgroundColor:"rgb(10, 75, 136)",color:"white"}}>
                    {(this.props.tzurArray[1] !== null && typeof this.props.tzurArray[1] !== 'undefined')? globFun.extractHeadersToTh(this.props.tzurArray[1]):null}
                </thead>
               <tbody>
                   {(this.props.tzurArray === null && typeof this.props.tzurArray !== 'undefined')?null:this.props.tzurArray.map(t=>{
                       return globFun.tableRowCreator(t);
                   })}
               </tbody>

            </table>
         );
    }
}
 
export default TzurRepositoryTable;