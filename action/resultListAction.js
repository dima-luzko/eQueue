import { GET_RESULT_LIST_URL } from '../constants/url'
import { store } from '../App'

export const result = resultList => {
    return {
        type: "GET_RESULT_LIST",
        resultList
    }
}

export const getResultList = () => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + GET_RESULT_LIST_URL)
            .then(result => result.json())
            .then((json) => {
                dispatch(result(json))
            })
    }
}