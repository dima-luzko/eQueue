import { SERVICES_FETCHING_DATA_SUCCESS } from '../constants/constants'

const initialState = {
    services: []
}

export default getServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVICES_FETCHING_DATA_SUCCESS:
            return {
                ...state,
                services: action.services,
            }
        default:
            return state
    }
}