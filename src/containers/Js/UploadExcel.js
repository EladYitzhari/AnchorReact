import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file'
import '../Css/UploadExcel.css'
import UploadTable from '../../components/Js/UploadTable'
import * as actionTypes from '../../store/actions/actionTypes'
import {connect} from 'react-redux';
import uploadImg from '../../images/Network-Upload-icon.png';
import uploadImg_sml from '../../images/Network-Upload-icon (1).png';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import * as excelAction from '../../store/actions/ExcelAction'
import axios from 'axios';
import Spinner from '../../components/Js/Spinner';
import * as movementsAction from '../../store/actions/MovementAction'

class UploadExcel extends Component {
    state = { 
        trows:this.props.rows,
        tzurSection:false,
        tzurMonth:null,
        tzurYear:null,
        tzurReportType:null
        
     }


     componentDidMount=()=>{
         ///Check if token exist, if not send the client to the login page
        if(this.props.token === null && localStorage.getItem("token") === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }
     }
    
    handleFiles =(files) =>{
        readXlsxFile(files[0]).then((rows) => {
            //check if movements file or CSAM
            if(rows[0][0] !== "ISIN" && rows[0][0] !== "Fund" )
            {
                alert('CSAM File Detected');
                console.log(rows);
                this.props.uploadExcel(rows);
                this.props.convertToCsamRowObject(rows);
                this.props.toggleSpinner();
            }else if(rows[0][0] !== "Fund"){
                alert('MOVEMENTS File Detected');
                console.log("from the excel",rows);
                this.props.convertEcelToMovementRows(rows);
                this.props.toggleSpinner();
            }else{
                alert('Tzur Nav File Detected');
                if(this.state.tzurMonth !== null && this.state.tzurYear !== null && this.state.tzurReportType !== null ){
                    this.props.convertEcelToTzurRows(rows,this.state.tzurMonth,this.state.tzurYear,this.state.tzurReportType);
                    this.props.toggleSpinner();
                }else{
                    alert("You didn't set the detail of the report,please set them first");
                }
                
            }

            console.log(rows);
            
           
          })
    }

    toggleTzurUploadSection = ()=> {
        this.setState({ tzurSection: !this.state.tzurSection });

        
    }
   
    setTzurDetails=(e,key)=>{
        this.setState({[key]: e.target.value});

    }
    



    render() { 


       let spinner =null;
        if(this.props.spinnerShow)
        {
            spinner=<Spinner/>;
        }
       let tzurSection = null;
       if(this.state.tzurSection){
            tzurSection = (
                <div style={{marginTop:"2%"}}>
                    Month
                    <select className="monthSelector" style={{marginLeft:'1%',marginRight:'1%'}} onChange={(e)=> this.setTzurDetails(e,"tzurMonth")}>
                    <option value=""></option><option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option>
                    <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option>
                    <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option>
                    </select>
                    Year
                    <select className="yearSelector" style={{marginLeft:'1%',marginRight:'1%'}} onChange={(e)=> this.setTzurDetails(e,"tzurYear")}>
                    <option value=""></option><option value="2018">2018</option> <option value="2019">2019</option> <option value="2020">2020</option> <option value="2021">2021</option>
                    <option value="2022">2022</option> <option value="2023">2023</option> <option value="2024">2024</option> 
                    </select>
                    Report Type
                    <select className="reportSelector" style={{marginLeft:'1%',marginRight:'1%'}} onChange={(e)=> this.setTzurDetails(e,"tzurReportType")}>
                    <option value=""></option><option value="Active">Active</option> <option value="HTM">HTM</option> <option value="HTM-Leverage">HTM-Leverage</option> <option value="cash">Cash</option>
                    <option value="entire">Entire</option>
                    <option value="IG">IG</option>
                    </select>
                </div>
            )
       }

     
        return ( 
            <div className="mainUploadDiv">

                <div className="UploadHeaderDiv">
                Upload Excel Page <img src={uploadImg} alt='uploadImg'/>
                </div>              
                <br/>
                Please upload 
                <br />
                 CSAM file / Movements File
                <br/>
                
                <div id="inputfile" className="uploadInput input-group">
                        <div className="custom-file">
                                <input type="file"  onChange={(e)=> this.handleFiles(e.target.files)} className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                                <label className="custom-file-label" for="inputGroupFile04">Choose file</label>
                        </div>
                <ReactToExcel className="btn "
                    table="uploadCsamTable"
                    filename="Csam Table"
                    sheet="Csam Table"
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                />
                </div>
                <br />
                <button onClick={()=>this.toggleTzurUploadSection()}>Upload Tzur reports</button>
                {spinner}
                {tzurSection}
                <UploadTable />

            </div>
         );
    }

}

const mapStateToProp = state =>
{
    return {
            rows: state.excel.rows,
            spinnerShow: state.excel.spinnerShow,
            token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        uploadExcel: (rows) => dispatch({type:actionTypes.UPLOAD_EXCEL,val:rows}),
        convertToCsamRowObject: (rows) => dispatch(excelAction.convertEcelToCsamRows(rows)),
        toggleSpinner: ()=>dispatch({type:actionTypes.TOGGLE_SPINNER}),
        convertEcelToMovementRows: (rows) => dispatch(movementsAction.convertEcelToMovementRows(rows)),
        convertEcelToTzurRows: (rows,month,year,reportType) => dispatch(excelAction.convertEcelToTzurRows(rows,month,year,reportType))
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(UploadExcel);