import * as actionTypes from './actionTypes.js'
import * as globalFun from '../../components/Functions/globalFunction';
import * as datesFun from '../../components/Functions/dateFunctions';
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';

/////////////////////////INSERT NEW MOVEMENTS////////////////////////////
export const insertMovements = (movementRowsArray) =>
{
    return {
            type: actionTypes.INSERT_MOVEMENTS,
            val:movementRowsArray
            };
      
}

export const toggleSpinner = () =>
{
    return {
            type: actionTypes.TOGGLE_SPINNER
            };
      
}

///////////////CONVERT THE EXCEL TO MOVES OBJECTS
export const convertEcelToMovementRows = (excelRows) =>
{
    return (dispatch,getState)  =>
    {
            let movementRowsArray =[];
            let labelsArray = [...excelRows[0]];
            excelRows.map((r,index)=>{
                let theRow ={...r}
            if(index !== 0){
                movementRowsArray.push(crateMovementRowObject(labelsArray,theRow)) 
                }
            });
            console.log("the final movement array: ");
            console.log(movementRowsArray);
            //upload to db

            fetch(location.serverAdress()+"/DataQ/Movement/newMovementsArray", {
                method: 'POST',
                body: JSON.stringify(movementRowsArray),
                headers: {
                  'Authorization': localStorage.getItem("token"),
                  'Content-Type': 'application/json'
                }
              })
            .then(httpFunctions.checkStatus)
            .then(function() {
              console.log('request succeeded: '+location.serverAdress()+"/DataQ/Movement/newMovementsArray");
              alert("The Movements Upload successfuly!");
              dispatch(toggleSpinner());
            }).catch(function(error) {
              console.log('Somthing went wrong, send that message to the admin: ', error);
              alert("Somthing went wrong, send that message to the admin: "+ error);
              dispatch(toggleSpinner());
            })

            dispatch(insertMovements(movementRowsArray));
        
        
    }
}

/////////////////////////HELP FUNCTIONS////////////////////////////////////////
const crateMovementRowObject=(keys,values)=> {
    let jsonObj={};
    let serverMovementsRowKies = globalFun.movementKeys;
    keys.map((k,index)=>{

            //check if date and convert to sql date-if find the char "/" that separate date
            if(String(values[index]).search("/") !== -1 )
            {
                jsonObj[serverMovementsRowKies[k]] = datesFun.convertDateToSqlDate(values[index]);
            }else{
                jsonObj[serverMovementsRowKies[k]]  = values[index];
            }   
        
        
        
    })
    //insert id and portfolio
    jsonObj["className"]= findClass(jsonObj["isin"]);
    jsonObj["effectiveDate"]= calculateEffectiveDate(jsonObj["orderDate"]);
    delete jsonObj['undefined'];
    return jsonObj;
}


const findClass =(isin)=>{
    let classesList = globalFun.clssesIsins;
    let theClass='';
    classesList.map(m=>{
        if(m.isin === isin){
            theClass = m.class;
        }
    })
    return theClass;
}


const calculateEffectiveDate = (orderDate) =>
{
    ///calculate the effective date by the order date
    let orderMonth = new Date(datesFun.convertDateToSqlDate(orderDate)).getMonth()+1;
    let orderYear = new Date(datesFun.convertDateToSqlDate(orderDate)).getFullYear();

    if(orderMonth>=1 && orderMonth<=3)
    {
        return new Date(orderYear+"-06-30");
    
    }else if(orderMonth>=4 && orderMonth<=6)
    {
        return  new Date(orderYear+"-09-30");
    }else if(orderMonth>=7 && orderMonth<=9)
    {
        return  new Date(orderYear+"-12-31");
    }else{
        if(orderMonth <= 12){
            return  new Date(Number(orderYear+1)+"-03-31")
        }else{
            return  new Date(orderYear+"-03-31");
        }
       
    }
}
////////////////////////FINISH HELP FUNCTIONS/////////////////////

//////////////bring all movements////////////////////
export const getAllMovements = () =>
{
    return (dispatch,getState)  =>
    {
        fetch(location.serverAdress()+"/DataQ/Movement/Movements", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/Movement/Movements", data)
          dispatch(insertMovements(data));
        }).catch(function(error) {
          console.log('request failed', error.data)
          alert("Somthing went wrong, send that message to the admin: "+error.data);

        })
 
    }
}


////////////////////////////GET USD FX //////////////////
export const insertUSDFx = (usdFx) =>
{
    return {
            type: actionTypes.GET_FX_USD,
            val:usdFx
            };
      
}



export const getUSDFx = () =>
{
    return (dispatch,getState)  =>
    {

        fetch(location.serverAdress()+"/DataQ/ImportFx/FxUSD", {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
        .then(httpFunctions.checkStatus)
        .then(httpFunctions.parseJSON)
        .then(function(data) {
          console.log('request succeeded: '+location.serverAdress()+"/DataQ/ImportFx/FxUSD", data)
          dispatch(insertUSDFx(data));
        }).catch(function(error) {
          console.log('request failed', error)
          alert("Somthing went wrong, send that message to the admin: "+error);

        })
 
    }
}