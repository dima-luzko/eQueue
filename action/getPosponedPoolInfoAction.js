import { GET_POSTPONE_POOL_INFO_URL } from '../constants/url'
import { store } from '../App'

export const postponeInfo = postponeCustomer => {
    return {
        type: "GET_POSTPONE_POOL_INFO",
        postponeCustomer
    }
}

export const postponePoolInfo = () => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + GET_POSTPONE_POOL_INFO_URL)
            .then(result => result.json())
            .then((json) => {
                dispatch(postponeInfo(json))
            })
    }
}