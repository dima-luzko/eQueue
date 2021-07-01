import { GET_NEXT_CUSTOMER_INFO} from '../constants/constants'

const initialState = {
    nextCustomer: undefined,
}

export default getNextCustomerInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEXT_CUSTOMER_INFO:
            return {
                ...state,
                nextCustomer: action.nextCustomer
            }
        default:
            return state
    }
}