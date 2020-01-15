
import axios from 'axios';
import * as actionTypes from './actionTypes.js'
import * as globalFunction from '../../components/Functions/globalFunction';


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


        axios.get("/DataQ/Class/Classes",{headers:{"Authorization":localStorage.getItem('token')}}).then(response => {
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

        axios.get("/DataQ/IsinRow/AllPortfoliosAssetsForTheMonth/"+month+"/"+year,{headers:{"Authorization":localStorage.getItem('token')}}).then(response => {
            dispatch(axiosAllPortfoliosAssets(response.data));
        });

        
    }
}

/////////////////////////GETING TZUR NAV////////////////////////////

export const axiosTzurNav = (tzurNav) =>
{
    return {
            type: actionTypes.GET_TZUR_NAV_DETAILS,
            val:tzurNav
            };
      
}

export const getTzurNav = (month,year,portfolioName) => {
    return dispatch  =>
    {

    axios.get("/DataQ/Nav/Nav/"+month+"/"+year+"/"+portfolioName,{headers:{"Authorization":localStorage.getItem('token')}}).then(response => {
        dispatch(axiosTzurNav(response.data));
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
        // let config = { headers: {'Authorization' : localStorage.getItem('token')},
        // withCredentials: true
        // };
        // console.log("the config is: ");
        // console.log(config);
        

        console.log("the cookies in portfolio are:"+ document.cookie);
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

        axios.get("/DataQ/IsinRow/IsinRows/"+portfolioName,{headers:{"Authorization":localStorage.getItem('token')}}).then(response => {
            console.log(response.data);
            let array = []; 
            response.data.filter(f=>{ return f.markPrice !== f.costPriceSettled  && f.costPriceSettled !== 0 && f.costPriceSettled !== null}).map(m=>{
                            let instans ={...m}; 
                            instans.deltaFromSettled = (m.markPrice-m.costPriceSettled)/m.markPrice*100;
                            array.push(instans);
                            });
            dispatch(axiosGetACsamRowsOfPortfolio(array));
            dispatch(udateAllCloList([...globalFunction.uniqArrayFromTable(response.data,'issuer_Name')]));    
        });
        
    }
}

/////////////////////////UPDATE_CLO_LIST////////////////////////////
export const udateAllCloList = (cloList) =>
{
    return {
            type: actionTypes.UPDATE_CLO_LIST,
            val:[...cloList]
            };
      
}

/////////////////////////UPDATE_CLO_LIST////////////////////////////
export const udateChoosenCloList = (choosenCloList) =>
{
    return {
            type: actionTypes.UPDATE_CHOOSEN_CLO_LIST,
            val:[...choosenCloList]
            };
      
}
 