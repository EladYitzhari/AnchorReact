import * as actionTypes from '../actions/actionTypes'


const initialState = {
    token: null,
    err:''

}

const reducer = (state = initialState ,action) => {
    switch(action.type){


        case actionTypes.AUTH_SUCCESS:
        {
            return {
               ...state,
               token:action.val
               
            }
        }
        case actionTypes.AUTH_FAIL:
            {
                return {
                   ...state,
                   err:action.val,
                   token: null
                   
                }
            }
        case actionTypes.AUTH_RESET:
            {
                return {
                    ...state,
                    token: null
                    
                }
        }
    }
    
    return state;
}


export default reducer;


