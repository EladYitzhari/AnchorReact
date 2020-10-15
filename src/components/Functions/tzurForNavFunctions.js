export const createTzurNavDetails=(tzurArray,month,year,reportType)=>{
    
    let tzurData = {
        accuredInterest: calculateByAcountNum(tzurArray,month,year,reportType,'61000'),
        monthlyAmortization: calculateByAcountNum(tzurArray,month,year,reportType,'46020'),
        CsamFee:calculateByAcountNum(tzurArray,month,year,reportType,'64200'),
        TzurFee:calculateByAcountNum(tzurArray,month,year,reportType,'62300'),
        otherCosts:(    calculateByGroup(tzurArray,month,year,reportType,"Misc.")+
                        calculateByGroup(tzurArray,month,year,reportType,"Set Up")+
                        calculateByGroup(tzurArray,month,year,reportType,"Insurance Expense")),
        lossPorvision:calculateByAcountNum(tzurArray,month,year,reportType,'65900'),
        levInterest:(   calculateByAcountNum(tzurArray,month,year,reportType,'61200')+
                        calculateByAcountNum(tzurArray,month,year,reportType,'61300')+
                        calculateByAcountNum(tzurArray,month,year,reportType,'61500')+
                        calculateByAcountNum(tzurArray,month,year,reportType,'72000')),
        otherIncomExpenses:calculateByAcountNum(tzurArray,month,year,reportType,'65900'),
        lastMonth:{
            otherCosts:(    calculateByGroup(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,"Misc.")+
            calculateByGroup(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,"Set Up")+
            calculateByGroup(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,"Insurance Expense")),
            levInterest:(   calculateByAcountNum(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,'61200')+
                        calculateByAcountNum(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,'61300')+
                        calculateByAcountNum(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,'61500')+
                        calculateByAcountNum(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,'72000')),
            TzurFee:calculateByAcountNum(tzurArray,lastMonthDate(month,year).month,lastMonthDate(month,year).year,reportType,'62300')
        }
    }

    return tzurData;
}





export const calculateByAcountNum=(tzurArray,month,year,reportType,acountNum)=>{

    let answer = 0;
    tzurArray.map(t=>{
        if(t.month === Number(month) && t.year === Number(year) && t.reportType.toLowerCase() === reportType.toLowerCase() &&  acountNum === t.acountNum){
            answer += t.changeAmont;
        }
    });
    return answer;
}


export const calculateByGroup=(tzurArray,month,year,reportType,group)=>{

    let answer = 0;
    tzurArray.map(t=>{
        if(t.month === Number(month) && t.year === Number(year) && t.reportType.toLowerCase() === reportType.toLowerCase() &&  group === t.acountGroup){
            answer += t.changeAmont;
        }
    })
    return answer;
}


export const lastMonthDate=(month,year)=>{
    let theMonth = (Number(month) === 1 )? 12 : Number(month)-1;
    let theYear = (Number(month) === 1 )? Number(year)-1: year;

    return {year:theYear,month:theMonth};

}