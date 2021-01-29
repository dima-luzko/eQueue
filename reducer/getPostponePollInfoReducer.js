import {GET_POSTPONE_POOL_INFO} from '../constants/constants'

const initialState = {
    postponeCustomer: undefined
}

export default callClientReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_POSTPONE_POOL_INFO:
            return {
                ...state,
                postponeCustomer: action.postponeCustomer
            }
        default:
            return state
    }
}