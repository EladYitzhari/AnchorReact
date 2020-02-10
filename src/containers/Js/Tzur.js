import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from '../../images/Microsoft-Excel-icon.png';
import '../../containers/Css/Tzur.css'
import generatIcon from '../../images/Generate-tables-icon.png'
import * as tzurAction from '../../store/actions/TzurActions'
import TzurReport from '../../components/Js/TzurReport'



class Tzur extends Component {
    state = {
        tzurMonth:1,
        tzurYear:2018,
        showReport:false
      }

      componentDidMount=()=>{
        ///Check if token exist, if not send the client to the login page
        if(this.props.token === null && localStorage.getItem("token") === null){
            alert("Login details didn't found, Please login again");
            this.props.history.push('/Auth')
        }


        this.props.getAllTzurArray();
      }


      setTzurDetails=(e,key)=>{
        this.setState({[key]: e.target.value});

    }

    toggleReport=()=>{
        this.setState({showReport: !this.state.showReport})
    }
    render() { 

        let tzurReport =null;
        if(this.state.showReport)
        {
            tzurReport =  <TzurReport tzurArray={this.props.tzurArray} month={this.state.tzurMonth} year={this.state.tzurYear}/>
        }

        return ( 
            <React.Fragment>
                <div className="Tzur_header">
                    Tzur
                </div>
                <div style={{marginTop:"2%"}} className="Tzur_controller">
                    Month
                    <select className="monthSelector" style={{marginLeft:'1%',marginRight:'1%'}} onChange={(e)=> this.setTzurDetails(e,"tzurMonth")}>
                    <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option>
                    <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option>
                    <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option>
                    </select>
                    Year
                    <select className="yearSelector" style={{marginLeft:'1%',marginRight:'1%'}} onChange={(e)=> this.setTzurDetails(e,"tzurYear")}>
                    <option value="2018">2018</option> <option value="2019">2019</option> <option value="2020">2020</option> <option value="2021">2021</option>
                    <option value="2022">2022</option> <option value="2023">2023</option> <option value="2024">2024</option> 
                    </select>
                    <img src={generatIcon} alt="generatIcon" onClick={()=>this.toggleReport()}/>
                    <ReactToExcel className="btn "
                    table="tzurTable"
                    filename={"Tzur Table-"+this.state.tzurMonth+"-"+this.state.tzurYear}
                    sheet={"Tzur-"+this.state.tzurMonth+"-"+this.state.tzurYear}
                    buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                    />
                </div>
            
                <div >
                   {tzurReport}
                </div>




            </React.Fragment>
         );
    }
}
 


const mapStateToProp = state =>
{
    return {
            tzurArray: state.tzur.tzur,
            token:state.auth.token
        }
}
 

const mapDispatchToProps = dispatch =>
{
    return {
        getAllTzurArray: () => dispatch(tzurAction.getAllTzurArray())
    }
}


export default connect(mapStateToProp,mapDispatchToProps)(Tzur);