import { CHANGE_FLEX_PRIORITY_URL } from '../constants/url'
import {store} from '../App'

export const changeFlex = user => {
    return {
        type: "CHANGE_FLEX_PRIORITY",
        user
    }
}

export const changeFlexPriority = (userId, serviceId, priority_to_set) => {
    return (dispatch) => {
        fetch( "http://" + store.getState().ipAddress.ipAddress + ":8081/api" + CHANGE_FLEX_PRIORITY_URL + userId + '&service_id=' + serviceId + '&priority_to_set=' + priority_to_set)
            
            .then(() => {
                dispatch(changeFlex())
            })
    }
}