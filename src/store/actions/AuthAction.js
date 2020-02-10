import * as actionTypes from './actionTypes.js'
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';
import cookie from 'react-cookies'

/////////////////////////GETING ALL CALSSES////////////////////////////
export const authSuccess = (token) =>
{
    return {
            type: actionTypes.AUTH_SUCCESS,
            val:token
            };
      
}

export const authFail = (err) =>
{
    return {
            type: actionTypes.AUTH_FAIL,
            val:err
            };
      
}
export const authReset = (err) =>
{
    return {
            type: actionTypes.AUTH_RESET
            };
      
}
export const authStart =()=>{
    return {
        type: actionTypes.AUTH_START
        };
}
export const tryAuth = (email,pass) =>
{
    return dispatch  =>
    {
        dispatch(authStart());
        let authData = {
            email:email,
            password:pass
        };

        fetch(location.serverAdress()+"/Login", {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
              'Content-Type': 'application/json',
              credentials: 'include'
            }
          })
        .then(httpFunctions.checkStatus)
        .then(response=>{
            return response.text();
        })
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/Login");
          console.log(data);
          cookie.save("token",data, { path: '/' })
          
          dispatch(authSuccess(data));
          localStorage.setItem('token',data);
          
          //delete the token after an hour
          setTimeout(() => {
            localStorage.removeItem("token");
            dispatch(authReset(data));
          }, 1000*60*60);
        
        }).catch(function(error) {
          console.log('Somthing went wrong, send that message to the admin: ', error);
          alert("Try again, the Login failed");
          dispatch(authFail(error));
        })        
    }
}