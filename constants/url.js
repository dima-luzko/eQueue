import AsyncStorage from '@react-native-async-storage/async-storage';

let value =  AsyncStorage.getItem('ip')

export let SOCKET_URL
export let GET_USERS_URL
export let GET_SELF_SERVICES_URL
export let REDIRECT_CUSTOMER_URL
export let KILL_NEXT_CUSTOMER_URL
export let GET_SERVICES_URL
export let INVITE_NEXT_CUSTOMER_URL
export let GET_START_CUSTOMER_URL
export let GET_FINISH_CUSTOMER_URL
export let POSTPONE_CUSTOMER_URL
export let GET_POSTPONE_POOL_INFO_URL
export let INVITE_POSTPONE_CUSTOMER_URL
export let GET_RESULT_LIST_URL
export let CHANGE_FLEX_PRIORITY_URL
export let SERVER_STATE_URL =  "/common/health"

setTimeout(() => {
    SOCKET_URL = "/websocket"
    GET_USERS_URL = "/operator/getUsers"
    GET_SELF_SERVICES_URL =  "/operator/getSelfServices?user_id="
    REDIRECT_CUSTOMER_URL =  "/operator/redirectCustomer"
    KILL_NEXT_CUSTOMER_URL =  "/operator/killNextCustomer?user_id="
    GET_SERVICES_URL =  "/terminal/getServices"
    INVITE_NEXT_CUSTOMER_URL =  "/operator/inviteNextCustomer?user_id="
    GET_START_CUSTOMER_URL =  "/operator/getStartCustomer?user_id="
    GET_FINISH_CUSTOMER_URL =  "/operator/getFinishCustomer"
    POSTPONE_CUSTOMER_URL =  "/operator/customerToPostpone"
    GET_POSTPONE_POOL_INFO_URL =  "/operator/getPostponedPoolInfo"
    INVITE_POSTPONE_CUSTOMER_URL =  "/operator/invitePostponeCustomer?user_id="
    GET_RESULT_LIST_URL =  "/operator/getResultsList"
    CHANGE_FLEX_PRIORITY_URL =  "/operator/changeFlexPriority?user_id="
    console.log("Текущий ip-адрес: ", value._W);
}, 200);