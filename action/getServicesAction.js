import { GET_SERVICES_URL } from '../constants/url'
import { store } from '../App'

export const getServicesSuccess = services => {
    return {
        type: "SERVICES_FETCHING_DATA_SUCCESS",
        services
    }
}

export const getServices = () => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + GET_SERVICES_URL)
            .then(result => result.json())
            .then((json) => {
                dispatch(getServicesSuccess(json))
            })
    }
}