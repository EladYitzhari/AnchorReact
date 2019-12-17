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