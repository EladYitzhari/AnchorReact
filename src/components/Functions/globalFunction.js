
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

export const deltaOfMonthsBetweenDates=(date_old,date_new)=>
{
    let year_old = new Date(date_old).getFullYear();
    let year_new = new Date(date_new).getFullYear();
    let month_old = new Date(date_old).getMonth();
    let month_new = new Date(date_new).getMonth();

    return (year_new-year_old)*12+month_new-month_old;

}

export const deltaOfDaysBetweenDates=(date_old,date_new)=>
{
    let timeDiff = Math.abs(new Date(date_new).getTime() - new Date(date_old).getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;

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
        <tr >
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
"Reinv End Date":"reinvEndDate",
"id":"id",
"portfolioName":"portfolioName"

}


//only the relevant cells take care, all the athers stand here for option if we will want it ub future
export const movementKeys={
    "ISIN":"isin",
    "FundSettle order number":"fundSettleId",
    "Order type":"type",
    "Order date":"orderDate",
    "Effective Settlement date":"effectiveDate",
    "Number of shares":"quantity",
    "Instructed gross cash amount":"amount",
    "Currency":"originalCurrency",
    "Details":"details"
}

export const clssesIsins =[

    {"isin":"KYG706221408","class":"A-USD","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221085","class":"A-NIS","portfolio":"HTM-Leverage"},
    {"isin":"KYG706221572","class":"B-USD","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221168","class":"B-NIS","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221655","class":"C-USD","portfolio":"HTM-Leverage"},
    {"isin":"KYG706221242","class":"C-NIS","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221739","class":"D-USD","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221325","class":"D-NIS","portfolio":"HTM-Leverage"},
    {"isin":"KYG706221812","class":"E1-USD","portfolio":"HTM-Leverage"},
	{"isin":"KYG706221994","class":"E2-ILS","portfolio":"HTM"},
    {"isin": "KYG706222232","class":"G1-USD","portfolio":"HTM-Leverage"},
	{"isin":"KYG706222315","class":"G2-USD","portfolio":"HTM"},
    {"isin":"KYG706222497","class":"H1-USD","portfolio":"HTM-Leverage"},
    {"isin":"KYG706222562","class":"H2-NIS","portfolio":"HTM-Leverage"},
    {"isin":"KYG706222646","class":"I1-USD","portfolio":"HTM-Leverage"},
    {"isin":"KYG706222729","class":"I2-USD","portfolio":"HTM-Leverage"},
    {"isin":"KYG706222802","class":"J1-USD","portfolio":"Active"},
	{"isin":"KYG706222984","class":"J2-USD","portfolio":"Active"},
	{"isin":"KYG706223065","class":"K-USD","portfolio":"Active"},
    {"isin":"XDO417744626","class":"L-USD","portfolio":"HTM-Leverage"},
    {"isin":"GP-USD","class":"GP-USD","portfolio":""}
]

/////////////////////////////TZUR OBJECT ++ ////////////////////////
export const tzurKies ={
    "Account Num": "acountNum",
    "Account Description": "acountDescription",
    "Change": "changeAmont"
}

export const tzurGroupes = [
    {'acountNum': "61500",'acountGroupe': 'Interest Expense'},
    {'acountNum': "64300",'acountGroupe': 'Misc.'},
    {'acountNum': "61000",'acountGroupe': 'Interest Income'},
    {'acountNum': "72004",'acountGroupe': 'Insurance Expense'},
    {'acountNum': "72000",'acountGroupe': 'Bank Interest Income'},
    {'acountNum': "61300",'acountGroupe': 'Interest Expense'},
    {'acountNum': "64900",'acountGroupe': 'Misc.'},
    {'acountNum': "64200",'acountGroupe': 'CSAM'},
    {'acountNum': "56020",'acountGroupe': 'Realized Capital Gain/Loss'},
    {'acountNum': "46020",'acountGroupe': 'M t M - Unrealized'},
    {'acountNum': "62700",'acountGroupe': 'Misc.'},
    {'acountNum': "62300",'acountGroupe': 'Tzur'},
    {'acountNum': "68111",'acountGroupe': 'Misc.'},
    {'acountNum': "64000",'acountGroupe': 'Management'},
    {'acountNum': "62200",'acountGroupe': 'Set Up'},
    {'acountNum': "50030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "59930",'acountGroupe': 'FX Hedge'},
    {'acountNum': "57130",'acountGroupe': 'FX Hedge'},
    {'acountNum': "57030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "57020",'acountGroupe': 'Realized Off BAL'},
    {'acountNum': "45930",'acountGroupe': 'FX Hedge'},
    {'acountNum': "42830",'acountGroupe': 'FX Hedge'},
    {'acountNum': "40030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "47130",'acountGroupe': 'Unrealized FX'},
    {'acountNum': "47030",'acountGroupe': 'Unrealized FX'},
    {'acountNum': "47020",'acountGroupe': 'FX Hedge'},
    {'acountNum': "14100",'acountGroupe': 'Previous Month Incentive Fee'},
    {'acountNum': "65900",'acountGroupe': 'Credit Loss Allowance 0.12%'},
    {'acountNum': "51030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "71000",'acountGroupe': 'Misc.'},
    {'acountNum': "61200",'acountGroupe': 'Interest Expense'},
    {'acountNum': "41030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "46030",'acountGroupe': 'FX Hedge'},
    {'acountNum': "0",'acountGroupe': 'M t M - Unrealized'},   
]







