import { GET_SELF_SERVICES_URL } from '../constants/url'
import { store } from '../App'

export const selfServices = (selfServices) => {
    return {
        type: "GET_SELF_SERVICES",
        selfServices,
    }
}

export const getSelfServices = (userId, point) => {
    return (dispatch) => {
        fetch("http://" + store.getState().ipAddress.ipAddress + ":8084/api" + GET_SELF_SERVICES_URL + userId + '&point=' + point, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(result => result.json())
            .then((json) => {
                dispatch(selfServices(json))
            })
    }
}