import { INVITE_CUSTOMER, GET_START_INVITE_CUSTOMER, GET_FINISH_INVITE_CUSTOMER, KILL_CUSTOMER, REDIRECT_CUSTOMER, POSTPONE_CUSTOMER, GET_POSTPONE_POOL_INFO, INVITE_POSTPONE_CUSTOMER } from '../constants/constants'

const initialState = {
    customer: undefined,
    postponeCustomer: undefined
}

export default callClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVITE_CUSTOMER:
            return {
                ...state,
                customer: action.customer
            }
        case GET_START_INVITE_CUSTOMER:
            return {
                ...state,
                customer: action.customer
            }
        case GET_FINISH_INVITE_CUSTOMER:
            return {
                ...state,
                customer: undefined
            }
        case KILL_CUSTOMER:
            return {
                ...state,
                customer: undefined
            }
        case REDIRECT_CUSTOMER:
            return {
                ...state,
                customer: undefined
            }
        case POSTPONE_CUSTOMER:
            return {
                ...state,
                customer: undefined
            }
        case INVITE_POSTPONE_CUSTOMER:
            return {
                ...state,
                customer: action.customer
            }
        case GET_POSTPONE_POOL_INFO:
            return {
                ...state,
                postponeCustomer: action.postponeCustomer
            }
        default:
            return state
    }
}