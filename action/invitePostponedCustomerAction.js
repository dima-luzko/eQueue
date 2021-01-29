import {INVITE_POSTPONE_CUSTOMER_URL} from '../constants/url'
import {store} from '../App'

export const inviteCustomer = customer => {
    return {
        type: "INVITE_POSTPONE_CUSTOMER",
        customer
    }
}

export const invitePostponedCustomer = (userId, customerId) => {
    return (dispatch) => {

        fetch("http://" + store.getState().ipAddress.ipAddress + ":8081/api" + INVITE_POSTPONE_CUSTOMER_URL + userId + '&customer_id=' + customerId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(result => result.json())
            .then((json) => {
                dispatch(inviteCustomer(json))
            })


    }
}