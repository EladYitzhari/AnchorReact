import React, { Component } from 'react';
import {Line,Bar,Pie} from 'react-chartjs-2';




class Chart extends Component {
    state = {  }

    uniqeArray =(array,filedX,filedY) =>
    {
        let middleXArray =[];
        array.map(r=>{
            middleXArray.push(r[filedX]);
        });

        const onlyUnique = (value, index, self) => { 
            return self.indexOf(value) === index;
        }
        
        // usage example:
        let unique = middleXArray.filter( onlyUnique );

        let middleYArray =[];
        unique.map(u=>{
            let totalQuantity= 0;
            let FieldVAlueMultpleQuantity=0;
            array.map(a=>{
                if(a[filedX] === u)
                {
                    totalQuantity += a.quantity;
                    FieldVAlueMultpleQuantity += a.quantity*a[filedY];
                }
            });
            middleYArray.push(FieldVAlueMultpleQuantity/totalQuantity);
        });

        const bigArray={
            x:unique,
            y:middleYArray
        }

        return bigArray;
    }

    creatDataSetFieldByAsOfDate =(field) =>
    {

        let fieldArray =[];
        this.props.labels.map(d=>{
            let totalQuantity= 0;
            let filedMultpleQuantity=0;
            this.props.data.map(r=>{
                if(new Date(d).getTime() ===new Date(r.asOfDate).getTime() )
                {
                    totalQuantity += r.quantity;
                    filedMultpleQuantity += r.quantity*r[field];
                }
            });
            fieldArray.push(filedMultpleQuantity/totalQuantity);
            
           
        })
        return fieldArray;
    }
    
    render() { 
        return ( 
            <React.Fragment>
            <Line    
                width={1000} height={350}
                options={{
                    // padding:"0px",
                    responsive:false,
                    maintainAspectRatio:false,
                    defaultFontSize:"30px",
                    width:"40",
                    height:"40",
                    legend:{
                        display:true
                    }}}
                    data=
                    {{
                        labels:[...this.props.labels],
                        datasets:[
                            {
                                borderColor:'green',
                                label:this.props.lineFiled,
                                data:[...this.creatDataSetFieldByAsOfDate(this.props.lineFiled)]
                            }
                        ]
                    }}
            />
            {/* <Pie    
                width={1000} height={350}
                options={{
                    // padding:"0px",
                    responsive:false,
                    maintainAspectRatio:false,
                    defaultFontSize:"30px",
                    width:"40",
                    height:"40",
                    legend:{
                        display:true
                    }}}
                    data=
                    {{
                        labels:[...this.uniqeArray(this.props.data,this.props.chartData['xFiled'],this.props.chartData['yFiled']).x],
                        datasets:[
                            {
                                borderColor:'green',
                                label:this.props.field,
                                data:[...this.uniqeArray(this.props.data,this.props.chartData['xFiled'],this.props.chartData['yFiled']).y]
                            }
                        ]
                    }}
            /> */}
            </React.Fragment>
         );
    }
}
 
export default Chart;