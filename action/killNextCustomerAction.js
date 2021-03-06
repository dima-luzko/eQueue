import { KILL_NEXT_CUSTOMER_URL } from '../constants/url'
import { store } from '../App'

export const killCustomer = () => {
    return {
        type: "KILL_CUSTOMER"
    }
}

export const killNextCustomer = (userId) => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + KILL_NEXT_CUSTOMER_URL + userId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                dispatch(killCustomer())
            })
    }
}