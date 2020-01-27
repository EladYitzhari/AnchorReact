
import * as actionTypes from './actionTypes.js'
import * as DFunctions from '../../components/Functions/dateFunctions'
import * as globalFun from '../../components/Functions/globalFunction'
import 'whatwg-fetch'
import * as httpFunctions from '../../components/Functions/httpRequestFunctions';
import * as location from '../../components/Functions/location';

/////////////////////////UPLOAD ALL CSAMROWS////////////////////////////
export const insertCsamRows = (CsamRows) =>
{
    return {
            type: actionTypes.CONVER_EXCEL_TO_CSAMROW,
            val:CsamRows
            };
      
}

export const toggleSpinner = () =>
{
    return {
            type: actionTypes.TOGGLE_SPINNER
            };
      
}

export const convertEcelToCsamRows = (excelRows) =>
{
    return (dispatch,getState)  =>
    {
            let csamRowsArray =[];
            let labelsArray = [...excelRows[0]];
            let datesCells = [19,20,21,22,37,39];
            excelRows.map((r,index)=>{
                let theRow ={...r}
            if(index !== 0){
                    csamRowsArray.push(crateCsamRowObject(labelsArray,theRow,datesCells)) 
                }
            });
            //upload to db
            fetch(location.serverAdress()+"/DataQ/IsinRow/IsinRows", {
                method: 'POST',
                body: JSON.stringify(csamRowsArray),
                headers: {
                  'Authorization': getState().auth.token,
                  'Content-Type': 'application/json'
                }
              })
            .then(httpFunctions.checkStatus)
            .then(function() {
              console.log('request succeeded: '+location.serverAdress()+"/DataQ/Movement/newMovementsArray");
              alert("Upload successfully to the Database");
              dispatch(toggleSpinner());
            }).catch(function(error) {
              console.log('Somthing went wrong, send that message to the admin: ', error);
              alert("Somthing went wrong, send that message to the admin: "+ error);
              dispatch(toggleSpinner());
            })  
            dispatch(insertCsamRows(csamRowsArray));
        
        
    }
}

/////////////////////////HELP FUNCTIONS////////////////////////////////////////
const crateCsamRowObject=(keys,values,dates)=> {
    let jsonObj={};
    let serverIsinRowKies = globalFun.isinRowKeys;
    keys.map((k,index)=>{
        //check if date and convert to sql date-if find the char "/" that separate date
        if(String(values[index]).search("/") !== -1 )
        {
            jsonObj[serverIsinRowKies[k]] = DFunctions.convertDateToSqlDate(values[index]);
        }else{
            jsonObj[serverIsinRowKies[k]]  = values[index];
        }
        
    })
    //insert id and portfolio
    jsonObj["id"]= generateId(values[0],values[4],values[39]);
    jsonObj["portfolioName"]= getPortfolioName(values[0]);
    return jsonObj;
}

const generateId=(name,isin,asOfDate)=>
{
    if(name.search("HTM Le") !== -1)
    {
        return 'HTM-Leverage-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
    }else if(name.search("HTM") !== -1){
        return 'HTM-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
    }else{
        return 'Active-'+isin+'-'+DFunctions.convertDateToSqlDate(asOfDate);
    }
}

const getPortfolioName=(name)=>
{
    if(name.search("HTM Le") !== -1)
    {
        return 'HTM-Leverage';
    }else if(name.search("HTM") !== -1){
        return 'HTM';
    }else{
        return 'Active';
    }
}


/////////////////////////END HELP FUNCTIONS////////////////////////////////////////
