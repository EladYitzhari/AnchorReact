import React from 'react';


export const convertDateToSqlDate = (mn_dd_yy_Date) =>
{
    const theDate = new Date(Date.parse(mn_dd_yy_Date));
    const year = theDate.getFullYear();
    let month = '';
    if(String(theDate.getMonth()+1).length<2)
    {
       month = '0'+(theDate.getMonth()+1);
    }else{
        month = (theDate.getMonth()+1);
    }
    let  day = '';
    if(String(theDate.getDate()).length<2)
    {
        day = '0'+theDate.getDate();
    }else{
         day = theDate.getDate();
    }
    return year+'-'+month+'-'+day;
}

export const numOfDaysInMonth = (monthNum)=>{
    switch(monthNum){
        case 0 :{
            return 31;
        }
        case 1 :{
            return 28;
        }
        case 2 :{
            return 31;
        }
        case 3 :{
            return 30;
        }
        case 4 :{
            return 31;
        }
        case 5 :{
            return 30;
        }
        case 6 :{
            return 31;
        }
        case 7 :{
            return 31;
        }
        case 8 :{
            return 30;
        }
        case 9 :{
            return 31;
        }
        case 10 :{
            return 30;
        }
        case 11 :{
            return 31;
        }
    }
    
}


Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

export const diffBetweenDates =(oldDateString,newDateString)=>{
    return Math.floor(( Date.parse(newDateString) - Date.parse(oldDateString) ) / 86400000); 
}  