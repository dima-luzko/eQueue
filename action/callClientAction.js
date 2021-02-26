import { INVITE_NEXT_CUSTOMER_URL, GET_START_CUSTOMER_URL, GET_FINISH_CUSTOMER_URL } from '../constants/url'
import { store } from '../App'

export const inviteCustomer = customer => {
    return {
        type: "INVITE_CUSTOMER",
        customer
    }
}

export const getStartInviteCustomer = customer => {
    return {
        type: "GET_START_INVITE_CUSTOMER",
        customer
    }
}

export const getFinishInviteCustomer = () => {
    return {
        type: "GET_FINISH_INVITE_CUSTOMER",

    }
}

export const inviteNextCustomer = (loggedUserId) => {
    return (dispatch) => {

        fetch("http://" + store.getState().ipAddress.ipAddress + ":8081/api" + INVITE_NEXT_CUSTOMER_URL + loggedUserId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(result => result.json())
            .then((json) => {
                dispatch(inviteCustomer(json))
            })
    }
}

export const getStartCustomer = (loggedUserId) => {
    return () => {

        fetch("http://" + store.getState().ipAddress.ipAddress + ":8081/api" + GET_START_CUSTOMER_URL + loggedUserId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

    }
}

export const getFinishCustomer = (data) => {
    return (dispatch) => {

        fetch("http://" + store.getState().ipAddress.ipAddress + ":8081/api" + GET_FINISH_CUSTOMER_URL, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                dispatch(getFinishInviteCustomer())
            })
    }
}