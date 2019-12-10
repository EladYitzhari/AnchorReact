import React, { Component } from 'react';




class ClassTable extends Component {
    state = { 
        
     }
    render() { 
        return ( 
            <table className="table table-hover w-25">
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Isin</th>
                    <th>Type</th>
                    <th>Currency</th>
                    <th>Distributing</th>
                    <th>Clo Strategy</th>
                    <th>Leverage</th>
                    <th>Fees Type</th>
                    <th>Admin Fee</th>
                    <th>Part Fee</th>
                    <th>Herdle</th>
                </tr>
            </thead>
            <tbody>
                {this.props.classes.map(c=>{
                    return (
                        <tr>
                            <td>{c['className']}</td>
                            <td>{c['isin']}</td>
                            <td>{c['type']}</td>
                            <td>{c['currency']}</td>
                            <td>{c['distributing']}</td>
                            <td>{c['cloStrategy']}</td>
                            <td>{c['leverage']}</td>
                            <td>{c['feesType']}</td>
                            <td>{c['adminFee']}</td>
                            <td>{c['paetFee']}</td>
                            <td>{c['herdle']}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
         );
    }
}
 
export default ClassTable;