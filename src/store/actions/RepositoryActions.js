
import * as actionTypes from './actionTypes.js'
import * as globalFunction from '../../components/Functions/globalFunction';
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';
import axios from 'axios';

/////////////////////////GETING ALL csamRows////////////////////////////
export const axiosAllCsamRows = (csamRows) =>
{
    return {
            type: actionTypes.BRING_ALL_CSAM_ROWS,
            val:csamRows
            };
      
}

export const getAllCsamRows = () =>
{
    return (dispatch,getState)  =>
    {

        fetch(location.serverAdress()+"/DataQ/IsinRow/IsinRows", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/IsinRows", data)

          console.log("brought all csam rows to repository");
          let array = []; 
          data.map(m=>{
              let instans ={...m};
              if(m.costPriceSettled === null  ||
                  m.settlementDate === null  ){
                      instans.DailyAmortization = 0;
                      instans.AggregateAmortization  = 0;
                      instans.CalculatedAmortizedCost = 0;
                      instans.CalculatedAmortizedPrice = 0;  
                  }else{
                      
                      let deltaOfDaysBetweenDates =  globalFunction.deltaOfDaysBetweenDates(m.settlementDate,m.asOfDate);
                      let DailyAmortization = (m.portfolioName === "Active")? 0: Number((100-m.costPriceSettled)/100/(m.wal*360)*m.quantity).toFixed(3);
                      let AggregateAmortization = DailyAmortization*deltaOfDaysBetweenDates;
                      let CalculatedAmortizedCost =  Number(m.quantity*m.costPriceSettled/100 + AggregateAmortization).toFixed(3);
                      let CalculatedAmortizedPrice = Number((100-m.costPriceSettled)/(m.wal*360)*deltaOfDaysBetweenDates+m.costPriceSettled).toFixed(3);
                      instans.DailyAmortization_c =  DailyAmortization;
                      instans.AggregateAmortization_c  =   AggregateAmortization;
                      instans.CalculatedAmortizedCost_c =   CalculatedAmortizedCost;
                      instans.CalculatedAmortizedPrice_c =    CalculatedAmortizedPrice;
              }
              array.push(instans);
          });
          dispatch(axiosAllCsamRows(array)); 
          
        }).catch(function(error) {
          console.log('request failed', error)
        })
        
    }
}

/////////////////////////////////////
export const getAllCsamRowsByAsOfDate = (asOfDate) =>
{
    return (dispatch)  =>
    {
      axios.get(location.serverAdress()+"/DataQ/IsinRow/IsinRowsByAsOfDate/"+new Date(asOfDate).getFullYear()+"/"+Number(new Date(asOfDate).getMonth()+1)+"/"+new Date(asOfDate).getDate()
      ,{headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(response =>{
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/IsinRowsByAsOfDate", response)

          console.log("brought all csam rows to repository by as of dates");
          let array = []; 
          response.data.map(m=>{
              let instans ={...m};
              if(m.costPriceSettled === null  ||
                  m.settlementDate === null  ){
                      instans.DailyAmortization = 0;
                      instans.AggregateAmortization  = 0;
                      instans.CalculatedAmortizedCost = 0;
                      instans.CalculatedAmortizedPrice = 0;  
                  }else{
                      
                      let deltaOfDaysBetweenDates =  globalFunction.deltaOfDaysBetweenDates(m.settlementDate,m.asOfDate);
                      let DailyAmortization = (m.portfolioName === "Active")? 0: Number((100-m.costPriceSettled)/100/(m.wal*360)*m.quantity).toFixed(3);
                      let AggregateAmortization = DailyAmortization*deltaOfDaysBetweenDates;
                      let CalculatedAmortizedCost =  Number(m.quantity*m.costPriceSettled/100 + AggregateAmortization).toFixed(3);
                      let CalculatedAmortizedPrice = Number((100-m.costPriceSettled)/(m.wal*360)*deltaOfDaysBetweenDates+m.costPriceSettled).toFixed(3);
                      instans.DailyAmortization_c =  DailyAmortization;
                      instans.AggregateAmortization_c  =   AggregateAmortization;
                      instans.CalculatedAmortizedCost_c =   CalculatedAmortizedCost;
                      instans.CalculatedAmortizedPrice_c =    CalculatedAmortizedPrice;
              }
              array.push(instans);
          });
          dispatch(axiosAllCsamRows(array)); 
          
        }).catch(function(error) {
          console.log('request failed', error)
        })
      }
}
/////////////////////////GETING ALL AS OF DATES////////////////////////////
export const axiosAllAsOfDates = (asOfDates) =>
{
    return {
            type: actionTypes.REPOSITORY_ALL_ASOFDATES,
            val:asOfDates
            };
      
}

export const getAllAsOfDates = () =>
{
    return (dispatch,getState)  =>
    {


        fetch(location.serverAdress()+"/DataQ/IsinRow/AllAsOfDateList", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/AllAsOfDateList", data)
          console.log("brought all As Of Dates to repository");

          dispatch(axiosAllAsOfDates(data));
        }).catch(function(error) {
          console.log('request failed', error)
        })
        
    }
}

 