import * as actionTypes from '../actions/actionTypes'


const initialState = {
    classes: [],
    portfolioName:'HTM-Leverage',
    asOfDateList: [],
    asOfDateListMonthOnly:[],
    csamRows:[],
    CloList:[],
    ChartAreaChoosenCLO:[],
    navData:{totalAssets:0},
    totalPortfoliosAssets:0,
    tzurNav:''
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
        case actionTypes.GET_ALL_AS_OF_DATAS_MONTHLY_ONLY:
            {
                return {
                   ...state,
                   asOfDateListMonthOnly:action.val
                   
                }
            } 
        case actionTypes.GET_ALL_CSAM_ROWS_FOR_PORTFOLIO:
                {
                    return {
                        ...state,
                        csamRows:action.val
                        
                    }
            } 
            case actionTypes.UPDATE_CLO_LIST:
                {
                    return {
                        ...state,
                        CloList:action.val,
                        ChartAreaChoosenCLO:action.val
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
        case actionTypes.UPDATE_CHOOSEN_CLO_LIST:
            {
                return {
                    ...state,
                    ChartAreaChoosenCLO:action.val
                    
                }
        }
        case actionTypes.GET_TZUR_NAV_DETAILS:
            {
                return {
                    ...state,
                    tzurNav:action.val
                    
                }
        }         
    }
    
    return state;
}


export default reducer;
