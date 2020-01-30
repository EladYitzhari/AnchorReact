import * as actionTypes from './actionTypes.js'
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';
import cookie from 'react-cookies'





export const recieveTzurArray = (tzurRowsArray) =>
{
    return {
            type: actionTypes.IMPORT_ALL_TZUR,
            val:tzurRowsArray
            };
      
}



export const getAllTzurArray = () =>
{
    return (dispatch)  =>
    {
        fetch(location.serverAdress()+"/DataQ/Tzur/allTzurList", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/Tzur/allTzurList", data)
          dispatch(recieveTzurArray(data));
        }).catch(function(error) {
          console.log('request failed', error.data)
          alert("Somthing went wrong, send that message to the admin: "+error.data);

        })
 
    }
}