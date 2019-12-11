import * as actionTypes from '../actionTypes'
import axios from 'axios'

const initialState = {
    classes: [],
    portfolioName:'HTM-Leverage',
    asOfDateList: []
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
        
    }
    
    return state;
}


export default reducer;
