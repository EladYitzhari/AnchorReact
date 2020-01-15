import axios from 'axios';
import * as actionTypes from './actionTypes.js'
import * as globalFunction from '../../components/Functions/globalFunction';
import Cookies from 'universal-cookie';



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

        // const cookies = new Cookies();
        console.log("the cookies are:"+ document.cookie);

        axios.post("/Login",authData).then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data));
            // axios.headers.common['Authorization'] = response.data;
            localStorage.setItem('token',response.data);
            // cookies.set('token',response.data);
            document.cookie = "token="+response.data;
            console.log("passed the axios");
        }).catch(err=>{
            dispatch(authFail(err));
        });
        
    }
}