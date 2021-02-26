import { GET_USERS_URL } from '../constants/url'
import { store } from '../App'

export const getDataSuccess = users => {
    return {
        type: "USERS_FETCHING_DATA_SUCCESS",
        users
    }
}

export const getDataFail = error => {
    return {
        type: "USERS_FETCHING_DATA_FAIL",
        error
    }
}

export const usersFetchData = () => {
    return (dispatch) => {

        fetch("http://" + store.getState().ipAddress.ipAddress + ":8081/api" + GET_USERS_URL)
            .then(result => result.json())
            .then((json) => {
                dispatch(getDataSuccess(json))
            })
    }
}
