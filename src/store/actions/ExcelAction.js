
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
        if(String(values[index]).search("/") !== -1 && String(values[index]).match(new RegExp('/', "gi") || []).length>1)
        {
            jsonObj[serverIsinRowKies[k]] = DFunctions.convertDateToSqlDate(values[index]);
        }else{
            jsonObj[serverIsinRowKies[k]]  = values[index];
        }
        
    })
    //insert id and portfolio
    jsonObj["id"]= generateId(values[0],values[4],jsonObj["asOfDate"]);
    jsonObj["portfolioName"]= getPortfolioName(values[0]);
    jsonObj["monthlyOrWeekly"]= (jsonObj["warf"] !== null && jsonObj["warf"] !== 0)? "monthly" : "weekly";
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


//////////////////Tzur upload Row//////////////////////

export const convertEcelToTzurRows = (excelRows,month,year,reportType) =>
{
    return (dispatch,getState)  =>
    {
            let tzurArray =[];
            let labelsArray = [...excelRows[0]];
            excelRows.map((r,index)=>{
                let theRow ={...r}
            if(index !== 0){
                    tzurArray.push(crateTzurObject(labelsArray,theRow,month,year,reportType)) 
                }
            });
            console.log("the tzur array is: ",tzurArray);
            //upload to db
            fetch(location.serverAdress()+"DataQ/Tzur/newTzurList", {
                method: 'POST',
                body: JSON.stringify(tzurArray),
                headers: {
                  'Authorization': getState().auth.token,
                  'Content-Type': 'application/json'
                }
              })
            .then(httpFunctions.checkStatus)
            .then(function() {
              console.log('request succeeded: '+location.serverAdress()+"/DataQ/Tzur/newTzurList");
              alert("Upload successfully to the Database");
              dispatch(toggleSpinner());
            }).catch(function(error) {
              console.log('Somthing went wrong, send that message to the admin: ', error);
              alert("Somthing went wrong, send that message to the admin: "+ error);
              dispatch(toggleSpinner());
            })  
            
        
        
    }
}

        ////HELP FUNCTION FOR TZUR/////////////////////////////////////////////////
const crateTzurObject=(keys,values,month,year,reportType)=> {
    let jsonObj={};
    let serverTzurRowKies = globalFun.tzurKies;
    jsonObj["tzurId"]= generateTzurId(values[1],month,year,reportType);
    keys.map((k,index)=>{

        if(serverTzurRowKies[k] !== null && typeof serverTzurRowKies[k] !== "undefined")
        {
            jsonObj[serverTzurRowKies[k]]  = values[index];
        }
        
        
    })
    //insert id and another fileds
    jsonObj["acountGroup"] = findTzurGroupe(jsonObj["acountNum"]);
    jsonObj["month"]= month;
    jsonObj["year"]= year;
    jsonObj["reportType"]= reportType;

    return jsonObj;
}

const generateTzurId=(acountNum,month,year,reportType)=>
{
    return acountNum+"-"+month+"-"+year+"-"+reportType;
}

const findTzurGroupe = (acountNum)=>
{
    let groupe= "";
    globalFun.tzurGroupes.map(a=>{
        if(a.acountNum  === acountNum){
            groupe = a.acountGroupe;
        }
    })

    return groupe;
}






/////////////////////////////////////////////////////