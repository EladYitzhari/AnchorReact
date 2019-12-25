import * as actionTypes from '../actions/actionTypes'


const initialState = {
    classes: [],
    portfolioName:'HTM-Leverage',
    asOfDateList: [],
    csamRows:[],
    navData:{totalAssets:0},
    totalPortfoliosAssets:0
}

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case actionTypes.GET_ALL_CLASSES:
        {
            return {
               ...state,
               classes:action.val
               
            }
        }
        case actionTypes.CHANGE_PORTFOLIO_NAME:
            {
                return {
                   ...state,
                   portfolioName:action.val
                   
                }
            }
        case actionTypes.GET_ALL_AS_OF_DATAS:
            {
                return {
                    ...state,
                    asOfDateList:action.val
                    
                }
        }   
        case actionTypes.GET_ALL_CSAM_ROWS_FOR_PORTFOLIO:
                {
                    return {
                        ...state,
                        csamRows:action.val
                        
                    }
            } 
        case actionTypes.UPDATE_NAV_DATA_TO_PORTFOLIO:
            {
                return {
                    ...state,
                    navData:action.val
                    
                }
        } 
        case actionTypes.ALL_PORTFOLIOS_ASSETS_AMOUNT:
            {
                return {
                    ...state,
                    totalPortfoliosAssets:action.val
                    
                }
        }       
    }
    
    return state;
}


export default reducer;
