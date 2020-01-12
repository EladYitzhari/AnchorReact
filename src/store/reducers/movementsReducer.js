import * as actionTypes from '../actions/actionTypes'


const initialState = {
    movements:[]
}

const reducer = (state = initialState ,action) => {

    switch(action.type){
        
        case actionTypes.INSERT_MOVEMENTS:
        {
            return {
               ...state,
               movements:action.val
               
            }
        }
       
    }
    
    return state;
}


export default reducer;
