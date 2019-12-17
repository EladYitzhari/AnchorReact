import * as actionTypes from '../actions/actionTypes'


const initialState = {
    rows: [],
    CsamRows:[],
    spinnerShow:false
}

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case actionTypes.UPLOAD_EXCEL:
        {
            return {
               ...state,
               rows:action.val
               
            }
        }
        case actionTypes.CONVER_EXCEL_TO_CSAMROW:
        {
            return {
               ...state,
               CsamRows:action.val
               
            }
        }
        case actionTypes.TOGGLE_SPINNER:
            {
                return {
                   ...state,
                   spinnerShow: !state.spinnerShow
                   
                }
            }
       
    }
    
    return state;
}


export default reducer;
