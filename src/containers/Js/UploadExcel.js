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


class UploadExcel extends Component {
    state = { 
        trows:this.props.rows,
        
     }



    
    handleFiles =(files) =>{
        readXlsxFile(files[0]).then((rows) => {
            this.props.uploadExcel(rows);
            this.props.convertToCsamRowObject(rows);
            console.log(rows);
            this.props.toggleSpinner();
           
          })
    }

   
    



    render() { 


       let spinner =null;
        if(this.props.spinnerShow)
        {
            spinner=<Spinner/>;
        }
       

     
        return ( 
            <div className="mainUploadDiv">

                <div className="UploadHeaderDiv">
                Upload Excel Page <img src={uploadImg} alt='uploadImg'/>
                </div>              
                <br/>
                Please upload the CSAM file
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
                {spinner}
                <UploadTable />

            </div>
         );
    }

}

const mapStateToProp = state =>
{
    return {
            rows: state.excel.rows,
            spinnerShow: state.excel.spinnerShow
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        uploadExcel: (rows) => dispatch({type:actionTypes.UPLOAD_EXCEL,val:rows}),
        convertToCsamRowObject: (rows) => dispatch(excelAction.convertEcelToCsamRows(rows)),
        toggleSpinner: ()=>dispatch({type:actionTypes.TOGGLE_SPINNER})
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(UploadExcel);