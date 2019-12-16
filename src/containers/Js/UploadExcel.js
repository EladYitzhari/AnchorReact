import React, { Component } from 'react';
import readXlsxFile from 'read-excel-file'
import '../Css/UploadExcel.css'
import UploadTable from '../../components/Js/UploadTable'
import * as actionTypes from '../../store/actions/actionTypes'
import { Route } from 'react-router';
import {connect} from 'react-redux';

class UploadExcel extends Component {
    state = { 
        trows:this.props.rows
     }



    
    handleFiles =(files) =>{
        readXlsxFile(files[0]).then((rows) => {
            this.props.uploadExcel(rows);
            
            console.log(rows);
          })
    }
 

    render() { 

      
       
       

     
        return ( 
            <div className="mainUploadDiv">

                <div className="UploadHeaderDiv">
                Upload Excel Page
                </div>              
                <br/>
                Please upload the CSAM file
                <br/>
                <div id="inputfile" className="uploadInput input-group">
                        <div className="custom-file">
                                <input type="file"  onChange={(e)=> this.handleFiles(e.target.files)} className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                                <label className="custom-file-label" for="inputGroupFile04">Choose file</label>
                        </div>
            
                </div>
                <UploadTable />

            </div>
         );
    }

}

const mapStateToProp = state =>
{
    return {
            rows: state.excel.rows,

        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        uploadExcel: (rows) => dispatch({type:actionTypes.UPLOAD_EXCEL,val:rows})
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(UploadExcel);