
import * as actionTypes from './actionTypes.js'
import * as globalFunction from '../../components/Functions/globalFunction';
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';

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
    return (dispatch,getState)  =>
    {

        fetch(location.serverAdress()+"/DataQ/Class/Classes", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+ location.serverAdress()+"/DataQ/Class/Classes", data)
          dispatch(axiosAllClasses(data));
        }).catch(function(error) {
          console.log('request failed', error)
        })


        
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
    return (dispatch,getState)  =>
    {

        fetch(location.serverAdress()+"/DataQ/IsinRow/AllPortfoliosAssetsForTheMonth/"+month+"/"+year, {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log("request succeeded" +location.serverAdress()+"/DataQ/IsinRow/AllPortfoliosAssetsForTheMonth/"+month+"/"+year, data)
          dispatch(axiosAllPortfoliosAssets(data));
        }).catch(function(error) {
          console.log('request failed', error)
        })

        
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


export const axiosAsOfDateListMonthOnly = (asOfDateList) =>
{
    return {
            type: actionTypes.GET_ALL_AS_OF_DATAS_MONTHLY_ONLY,
            val:asOfDateList
            };
      
}

export const getAsOfDateList = (portfolioName) =>
{
    return (dispatch,getState)  =>
    {                 
              fetch(location.serverAdress()+"/DataQ/IsinRow/AsOfDateList/"+portfolioName, {
                    method: 'GET',
      
                    headers: {
                      'Authorization': localStorage.getItem("token")
                    }
                  })
                .then(httpFunctions.checkStatus)
                .then(httpFunctions.parseJSON)
                .then(function(data) {
                  console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/AsOfDateList/"+portfolioName, data)
                  dispatch(axiosAsOfDateList(data));
                }).catch(function(error) {
                  console.log('request failed', error)
                })
    }
}

export const getAsOfDateListMonthOnly = (portfolioName) =>
{
    return (dispatch,getState)  =>
    {                 
              fetch(location.serverAdress()+"/DataQ/IsinRow/AllAsOfDateListMonthOnly/"+portfolioName, {
                    method: 'GET',
      
                    headers: {
                      'Authorization': localStorage.getItem("token")
                    }
                  })
                .then(httpFunctions.checkStatus)
                .then(httpFunctions.parseJSON)
                .then(function(data) {
                  console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/AllAsOfDateListMonthOnly/"+portfolioName, data)
                  dispatch(axiosAsOfDateListMonthOnly(data));
                }).catch(function(error) {
                  console.log('request failed', error)
                })
    }
}

export const  parseJSON=(response)=> {
    return response.json()
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
    return (dispatch,getState)  =>
    {
        dispatch(axiosGetACsamRowsOfPortfolio([]));

        fetch(location.serverAdress()+"/DataQ/IsinRow/IsinRows/"+portfolioName, {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/IsinRow/IsinRows/"+portfolioName, data)
         
          let array = [];
          data.filter(f=>{ return f.dailyAssetPrice !== f.costPriceSettled  && f.costPriceSettled !== 0 && f.costPriceSettled !== null}).map(m=>{
                          let instans ={...m};
                          let deltaBetweenPurchaseAndAsOfDate = globalFunction.deltaOfMonthsBetweenDates(m.settlementDate,m.asOfDate)+1;
                          let amortization =(m.settlementDate !== null)? (100-m.costPriceSettled)/(m.wal*12)*deltaBetweenPurchaseAndAsOfDate: 0;
                          instans.deltaFromSettled = (m.dailyAssetPrice-m.costPriceSettled+amortization)/m.costPriceSettled*100;
                          array.push(instans);
                          });
          dispatch(axiosGetACsamRowsOfPortfolio(array));
          dispatch(udateAllCloList([...globalFunction.uniqArrayFromTable(data,'issuer_Name')]));


        }).catch(function(error) {
          console.log('request failed', error)
        })


        
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
 