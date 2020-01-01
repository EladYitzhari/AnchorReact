
import React from 'react';



export const uniqArrayFromTable=(array,filed)=>{
    let middleXArray =[];
    array.map(r=>{
        middleXArray.push(r[filed]);
    });

    const onlyUnique = (value, index, self) => { 
        return self.indexOf(value) === index;
    }
    
    // usage example:
    return middleXArray.filter( onlyUnique );
}



export const createTableFromArray = array =>
{
    const instance = array[0];
    return  (
        <table className="table table-hover">
            <thead style={{backgroundColor:'rgb(6, 117, 168)'}}>{extractHeadersToTh(instance)}</thead>
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
                return(<td key={k+Math.random()} data-toggle="tooltip" data-placement="top" title={k}>
                    {(typeof instance[k] !== 'number')?instance[k]:
                      (instance[k]%1 >0)?instance[k].toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    :instance[k].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>

                ) 

            }) }
        </tr>)
       
}
export const isinRowKeys = {
"Portfolio Name":"portfolioName",
"Issuer Name":"issuer_Name",
"Asset Name":"asset_Name",
"CUSIP":"cusip",
"ISIN":"isin",
"Bloomberg_ID":"bloombergId",
"Asset_CurrencyType_ID":"currency",
"Quantity":"quantity",
"TradeCommitmentLocal":"tradeCommitmentBook",
"SettledCommitmentLocal":"settledCommitmentBook",
"MarketValueTradeCommitmentLocal":"marketValueTradeCommitmentBook",
"MarketValueSettledCommitmentLocal":"marketValueSettledCommitmentBook",
"CostPriceTraded":"costPriceTraded",
"CostPriceSettled":"costPriceSettled",
"MarkPrice_MarkPrice":"markPrice",
"AccruedInterest":"accruedInterest",
"Spread":"spread",
"Interest Rate":"interestRate",
"PIK Spread":"pikSpread",
"Accrual Start Date":"accrualStartDate",
"Accrual End Date":"accrualEndDate",
"Asset_MaturityDate":"assetMaturityDate",
"IssueFirstCouponDate":"issueFirstCouponDate",
"InstrumentMoodysRating":"instrumentMoodysRating",
"InstrumentS&PRating":"instrumentSPRating",
"Asset_IssueAmount":"assetIssueAmount",
"Asset_CurrentCommitmentAmount":"assetCurrentCommitmentAmount",
"WAL (1)":"wal",
"ABS Type":"absType",
"Collateral Administrator":"collateralAdministrator",
"Daily Asset Price (2)":"dailyAssetPrice",
"Tranche OC":"trancheOC",
"Tranche OC Cushion (4)":"trancheOcCushion",
"Junior OC (4)":"juniorOC",
"Junior OC Cushion (4)":"juniorOcCushion",
"WARF (4)":"warf",
"Trustee":"trustee",
"Settlement Date":"settlementDate",
"Bought In (Market/Offering)":"boughtInMrkrtOrOffering",
"As Of Date":"asOfDate",
"id":"id",
"portfolioName":"portfolioName"

}











