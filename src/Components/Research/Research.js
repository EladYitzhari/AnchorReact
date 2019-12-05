import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class Chart extends Component {
    state = { 
        data: {
            labels: ["1","2","3","4"],
            datasets: [
                {
                    label: "Test",
                    // backgroundColor: "red",
                    borderColor:"red",
                    pointBackgroundColor:"green",
                    pointBorderColor:"green",
                    data: [3,4,15,17]
                },
                {
                    label: "Test2",
                    borderColor: "blue",
                    data: [13,14,25,77]
                },
                {
                    label: "Test",
                    borderColor: "green",
                    data: [23,34,4,67]
                }
            ]
        }

     }
    render() { 
        return ( 
            <div style={{width:1000,height:1000}}>
                <h2>Test chart</h2>
                    <Line 
                        options={{responsive:true}}
                        data={this.state.data}
                    />
            </div>
         );
    }
}
 
export default Chart;