import * as actionTypes from '../actionTypes';


const initialState = {
    selectedAsOdDatePortfolioPage:''
}

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case actionTypes.SELECT_AS_OF_DATE_PORTFOLIO_PAGE:
        {
            return {
               ...state,
               selectedAsOdDatePortfolioPage:action.val
               
            }
        }
    }
    
    return state;
}


export default reducer;