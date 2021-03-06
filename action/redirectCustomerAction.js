import { REDIRECT_CUSTOMER_URL } from '../constants/url'
import { store } from '../App'

export const redirect = () => {
    return {
        type: "REDIRECT_CUSTOMER"
    }
}

export const redirectCustomer = (data) => {
    return (dispatch) => {

        fetch(store.getState().ipAddress.ipAddress + REDIRECT_CUSTOMER_URL, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                dispatch(redirect())
            })
    }
}
