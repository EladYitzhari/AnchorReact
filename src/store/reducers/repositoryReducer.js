import * as actionTypes from '../actions/actionTypes'


const initialState = {
    csamRows:[],
    allAsOfDates:[],
    whatsIn:'all'
}

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case actionTypes.BRING__CSAM_ROWS_BY_MONTH:
        {
            return {
               ...state,
               csamRows:action.val
               
            }
        }
        case actionTypes.BRING_ALL_CSAM_ROWS:
        {
            return {
               ...state,
               csamRows:action.val
               
            }
        }
        case actionTypes.REPOSITORY_ALL_ASOFDATES:
        {
            return {
                ...state,
                allAsOfDates:action.val
                
            }
        }
        
    }
    
    return state;
}


export default reducer;
