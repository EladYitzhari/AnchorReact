import React, { Component } from 'react';
import {connect} from 'react-redux';




class UploadTable extends Component {
    state = {  }
    render() { 
        return ( 
            <table>
                <thead>
                  <tr>
                      {this.props.rows.map((r,index)=>{
                            if(index === 0){
                              return   r.map(h=>{
                                    return <th key={'header'+h}>{h}</th>
                                })
                                
                            }
                             
                          
                      })}
                  </tr>
                </thead>









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