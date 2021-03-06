import { POSTPONE_CUSTOMER_URL } from '../constants/url'
import { store } from '../App'

export const postpone = () => {
    return {
        type: "POSTPONE_CUSTOMER"
    }
}

export const postponeCustomer = (data) => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + POSTPONE_CUSTOMER_URL, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                dispatch(postpone())
            })
    }
}