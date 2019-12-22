import React, { Component } from 'react';
import {Line,Bar,Pie} from 'react-chartjs-2';
import tableImg from '../../images/tables-icon.png'
import '../Css/GeneralChart.css'
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';




class GeneralChart extends Component {
    state = { 
        showTable:false
     }

    colorThems = ['green','red','blue','black','gray'];

    generateTable =()=>{
        let labels =[...this.state.labels];
        let datasets=[...this.state.datasets];

    }

    generateDataToChart =(array,rowFiledName,rowsHeaders,columnFileName,columnHeaders,value,gorupingStatus) =>
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
                        (a[value]===0 ||a[value]==='') ? dataSet.push(',') : dataSet.push(a[value]);
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


    toggleTable =()=>{
        this.setState({showTable: !this.state.showTable});
    }

    render() {


        //////////CREATE TABLE/////////////////////////
        let table =null;
        if(this.state.showTable)
        {
           let allTheDate =this.generateDataToChart(
            this.props.array,
            this.props.rowFiledName,
            this.props.rowsHeaders,
            this.props.columnFileName,
            this.props.columnHeaders,
            this.props.value,
            this.props.gorupingStatus); 
            table=(
                <table className='table table-hover portfolio_chart_table' id='chartTable'>
                    <thead>
                    <tr>
                        <th></th>
                        {allTheDate.labels.map((l,index)=>{
                          return  <th key={'chartTableTh'+index}>{l}</th >;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                        {allTheDate.datasets.map((d,index)=>{
                            return (
                                <tr key={'tbodyTr'+index}>
                                    <td>{d.label}</td>
                                    {d.data.map((r,index)=>{
                                        return <td key={'chartTableTd'+index}>{r}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) 
        }



        let chart = null;
        let chartType = this.props.chartType;
        if( chartType ==="Line")
        {
            chart = <div>
                <img  src={tableImg} alt='tableImg' onClick={this.toggleTable}/>
                <ReactToExcel className="btn "
                    table="chartTable"
                    filename="Chart Date"
                    sheet="Chart Data"
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />
                {table}
                        <Line  
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
                    
                    data={this.generateDataToChart(
                                this.props.array,
                                this.props.rowFiledName,
                                this.props.rowsHeaders,
                                this.props.columnFileName,
                                this.props.columnHeaders,
                                this.props.value,
                                this.props.gorupingStatus)} />
                        </div>;
        }else if(chartType ==="Bar"){
            chart = <Bar data={this.generateDataToChart} />;
        }else if(chartType ==="Pie"){
            chart =<Pie data={this.generateDataToChart} />;
        }

        return ( 
            <div>
                {chart}
            </div>
         );
    }
}
 
export default GeneralChart;