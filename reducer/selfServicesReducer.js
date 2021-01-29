import { GET_SELF_SERVICES } from '../constants/constants'

const initialState = {
    selfServices: [],
}

export default selfServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SELF_SERVICES:
            return {
                ...state,
                selfServices: action.selfServices,
                queueLength: action.queueLength
            }
        default:
            return state
    }
}