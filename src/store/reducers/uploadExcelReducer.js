import * as actionTypes from '../actions/actionTypes'


const initialState = {
    rows: []
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
       
    }
    
    return state;
}


export default reducer;
