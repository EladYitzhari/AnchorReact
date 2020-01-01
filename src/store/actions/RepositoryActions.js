
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
            dispatch(axiosAllCsamRows(response.data));
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
            dispatch(axiosAllAsOfDates(response.data));
        });
        
    }
}

 