
import axios from 'axios';
import * as actionTypes from './actionTypes.js'
import * as globalFunction from '../../components/Functions/globalFunction';


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
    return dispatch  =>
    {
        axios.get("/DataQ/IsinRow/IsinRows").then(response => {
            console.log("brought all csam rows to repository");
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
                        instans.DailyAmortization = (m.portfolioName === "Active")? 0: Number((100-m.costPriceSettled)/(m.wal*365)*m.settledCommitmentBook/100).toFixed(3);
                        instans.AggregateAmortization  = instans.DailyAmortization*deltaOfDaysBetweenDates;
                        instans.CalculatedAmortizedCost =  m.marketValueSettledCommitmentBook + instans.AggregateAmortization;
                        instans.CalculatedAmortizedPrice = instans.CalculatedAmortizedCost/m.settledCommitmentBook*100;  
                }
                array.push(instans);
            });
            dispatch(axiosAllCsamRows(array));
        });
        
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
    return dispatch  =>
    {
        axios.get("/DataQ/IsinRow/AllAsOfDateList").then(response => {
            console.log("brought all As Of Dates to repository");
            console.log(response.data);
  
            
            dispatch(axiosAllAsOfDates(response.data));
        });
        
    }
}

 