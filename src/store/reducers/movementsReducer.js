import * as actionTypes from '../actions/actionTypes'


const initialState = {
    movements:[],
    usdFx:0
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
        case actionTypes.GET_FX_USD:
            {
                return {
                   ...state,
                   usdFx:action.val
                   
                }
            }
           
       
    }
    
    return state;
}


export default reducer;
