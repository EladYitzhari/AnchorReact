import React, { Component } from 'react';




class NavCsamRowTable extends Component {
    state = {  }

    componentDidMount=()=>{
        let maxAsOfDateToMonth= '01-01-2019';
        let month = Number(this.props.dateDetails.navMonth);
        let year= Number(this.props.dateDetails.navYear);
        this.props.csamRows.map((c,index)=>{
            if(new Date(c.asOfDate).getMonth()+1 === month &&
                new Date(c.asOfDate).getFullYear() === year &&
                new Date(c.asOfDate).getTime()>new Date(maxAsOfDateToMonth).getTime() ){
                    maxAsOfDateToMonth = c.asOfDate;
                }
        })
        this.setState({theMaxAsOfDate:maxAsOfDateToMonth});
        console.log(maxAsOfDateToMonth);
    }


    render() { 
        return ( 
            <table>
                <thead>
                    <tr>                  
                        <th className='th-sm'>Asset Name</th>
                        <th className='th-sm'>Name</th>
                        <th className='th-sm'>ABS Type</th>
                        {/* // <th className='th-sm'>Is new</th> */}
                        <th className='th-sm'>Settlement Date</th>
                        <th className='th-sm'>Quantity</th>
                        <th className='th-sm'>Amortization Costs</th>
                        <th className='th-sm'>Cost Price Settled</th>
                        <th className='th-sm'>Daily Asset Price</th>
                        {/* // <th className='th-sm'>Setteled Amount</th> */}
                        <th className='th-sm'>MarketValueSettledCommitmentBook</th>
                        <th className='th-sm'>mark Price</th>
                        <th className='th-sm'>Begin Month Intrest</th>
                        <th className='th-sm'>Interest Rate</th>
                        <th className='th-sm'>Accrued Interest</th>
                        <th className='th-sm'>spread</th>
                        <th className='th-sm'>Wal</th>
                        <th className='th-sm'>Issue First Coupon Date</th>
                        <th className='th-sm'>Maturity Date</th>
                        <th className='th-sm'>Market/Offering</th>                       
                    </tr>
                </thead>
                <tbody>
                        {this.props.csamRows.map((c,index)=>{
                            if(c.asOfDate === this.state.theMaxAsOfDate){
                                return (
                                    <tr key={'navTableTr'+index}>
                                        <td>{c.asOfDate}</td>
                                        <td>{c.portfolioName}</td>
                                    </tr>
                                )
                            }
                        
                        })}
                </tbody>





            </table>
         );
    }
}
 
export default NavCsamRowTable;