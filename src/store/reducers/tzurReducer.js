import * as actionTypes from '../actions/actionTypes'


const initialState = {
    tzur:[]
}

const reducer = (state = initialState ,action) => {

    switch(action.type){
        
        case actionTypes.IMPORT_ALL_TZUR:
        {
            return {
               ...state,
               tzur:action.val
               
            }
        }
        
           
       
    }
    
    return state;
}


export default reducer;
