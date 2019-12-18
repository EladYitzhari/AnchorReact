import React, { Component } from 'react';
import {Line,Bar,Pie} from 'react-chartjs-2';





class GeneralChart extends Component {
    state = {  }

    colorThems = ['green','red','blue','black','gray'];

    

    generalTable =(array,rowFiledName,rowsHeaders,columnFileName,columnHeaders,value,gorupingStatus) =>
    {
        let dataLabels = columnHeaders;
        let datasets =[];
        rowsHeaders.map((r,index)=>{
            let dataSet =[];
            columnHeaders.map(c=>{
                let flag= false;
                array.map(a=>{
                    if(a[rowFiledName] === r && a[columnFileName]===c)
                    {
                        dataSet.push(a[value]);
                        flag =true;
                    }
                })
                if(!flag)
                {
                    dataSet.push(',');
                }
            })
            datasets.push({
                label:r,
                // borderColor :'green',
                // borderColor:this.colorThems[index],
                borderColor:'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')',
                data:dataSet
            }) 
        })

        return {
            labels:dataLabels,
            datasets:datasets
        }
        

    }




    render() {
        
        let chart = null;
        let chartType = this.props.chartType;
        if( chartType ==="Line")
        {
            chart = <Line  
            width={2000} height={700}
                options={{
                    // padding:"0px",
                    responsive:false,
                    maintainAspectRatio:false,
                    defaultFontSize:"30px",
                    width:"40",
                    height:"40",
                    
                    legend:{
                        display:true,
                        position:'right'
                    }}}
            
            data={this.generalTable(
                                                    this.props.array,
                                                    this.props.rowFiledName,
                                                    this.props.rowsHeaders,
                                                    this.props.columnFileName,
                                                    this.props.columnHeaders,
                                                    this.props.value,
                                                    this.props.gorupingStatus)} />;
        }else if(chartType ==="Bar"){
            chart = <Bar data={this.generalTable} />;
        }else if(chartType ==="Pie"){
            chart =<Pie data={this.generalTable} />;
        }

        return ( 
            <div>
                {chart}
            </div>
         );
    }
}
 
export default GeneralChart;