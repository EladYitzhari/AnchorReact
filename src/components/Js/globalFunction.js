
import React from 'react';


export const createTableFromArray = array =>
{
    const instance = array[0];
    return  (
        <table>
            <thead>{extractHeadersToTh(instance)}</thead>
            <tbody>
            {array.map(a => {
                return (
                    tableRowCreator(a)
                )
            })}
            </tbody>
        </table>);
     
}

export const extractHeadersToTh = instanse =>
{
    return (<tr>
        {Object.keys(instanse).map(key => {
           return <td key={key} >{key}</td>
        })}
    </tr>) 
}

export const tableRowCreator = instance =>
{
    const keysList = Object.keys(instance);
    return (
        <tr>
            { keysList.map((k,index) =>{
                return <td key={k+Math.random()}>{instance[k]}</td>
            }) }
        </tr>)
       
}

