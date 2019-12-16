import * as actionTypes from './actionTypes.js'








export const setSelectedAsOdDatePortfolioPage = (asOfDate) =>
{
    return {
            type: actionTypes.SELECT_AS_OF_DATE_PORTFOLIO_PAGE,
            val:asOfDate
            };
      
}

export const selectedAsOdDatePortfolioPage = (asOfDate) =>
{
    return dispatch  =>
    {
        dispatch(setSelectedAsOdDatePortfolioPage(asOfDate));
   
    }
}

