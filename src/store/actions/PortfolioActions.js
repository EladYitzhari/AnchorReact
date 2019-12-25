
import axios from 'axios';
import * as actionTypes from './actionTypes.js'



/////////////////////////GETING ALL CALSSES////////////////////////////
export const axiosAllClasses = (classes) =>
{
    return {
            type: actionTypes.GET_ALL_CLASSES,
            val:classes
            };
      
}

export const getAllClasses = () =>
{
    return dispatch  =>
    {
        axios.get("/DataQ/Class/Classes").then(response => {
            console.log(response.data);
            dispatch(axiosAllClasses(response.data));
        });
        
    }
}
/////////////////////////GETING ALL ASSETS FOR AL THE PORTFOLIOS////////////////////////////

export const axiosAllPortfoliosAssets = (totalPortfoliosAssets) =>
{
    return {
            type: actionTypes.ALL_PORTFOLIOS_ASSETS_AMOUNT,
            val:totalPortfoliosAssets
            };
      
}

export const getAllPortfoliosAssets = (month,year) =>
{
    return dispatch  =>
    {
        axios.get("/DataQ/IsinRow/AllPortfoliosAssetsForTheMonth/"+month+"/"+year).then(response => {
            dispatch(axiosAllPortfoliosAssets(response.data));
        });
        
    }
}
/////////////////////////GETING ALL AS OF DATE LIST////////////////////////////

export const axiosAsOfDateList = (asOfDateList) =>
{
    return {
            type: actionTypes.GET_ALL_AS_OF_DATAS,
            val:asOfDateList
            };
      
}

export const getAsOfDateList = (portfolioName) =>
{
    return dispatch  =>
    {
        axios.get("/DataQ/IsinRow/AsOfDateList/"+portfolioName).then(response => {
            console.log(response.data);
            dispatch(axiosAsOfDateList(response.data));
        });
        
    }
}

/////////////////////////CHANGE PORTFOLIO NAME////////////////////////////

export const changePortfolioName = (portfolioName) =>
{
    return dispatch  =>
    {
        dispatch({
            type: actionTypes.CHANGE_PORTFOLIO_NAME,
            val:portfolioName
            });
    }
}
/////////////////////////GETING ALL CSAM ROWS////////////////////////////

export const axiosGetACsamRowsOfPortfolio = (asOfDateList) =>
{
    return {
            type: actionTypes.GET_ALL_CSAM_ROWS_FOR_PORTFOLIO,
            val:asOfDateList
            };
      
}

export const getACsamRowsOfPortfolio = (portfolioName) =>
{
    return dispatch  =>
    {
        dispatch(axiosGetACsamRowsOfPortfolio([]));
        axios.get("/DataQ/IsinRow/IsinRows/"+portfolioName).then(response => {
            console.log(response.data);
            dispatch(axiosGetACsamRowsOfPortfolio(response.data));
        });
        
    }
}

 