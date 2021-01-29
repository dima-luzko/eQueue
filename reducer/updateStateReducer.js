import { UPDATE_TEXT, UPDATE_IMAGE, UPDATE_STATE_BUTTOM, PASSWORD, SELECT_USER, SECURE_TEXT_ENTRY, INPUT_IP_ADDRESS, TOTAL_LENGTH, GET_SOCKET_DATA } from '../constants/constants'



const initialState = {
    text: 0,
    image: 0,
    disableButtonCallClient: false,
    disableButtonInvitePostponeCustomer: false,
    disableButtonClientNotEnter: true,
    disableButtonStartClient: true,
    disableButtonRedirectClient: true,
    disableButtonPostponeClient: true,
    disableFinishClient: true,
    disableButtonExit: false,
    userSelected: "",
    password: '',
    secureTextEntry: true,
    ipAddress: "",
    socket: undefined,
    totalLength: 0

}

export default updateStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TEXT:
            return {
                ...state,
                text: action.text
            }
        case UPDATE_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case PASSWORD:
            return {
                ...state,
                password: action.password
            }
        case SELECT_USER:
            return {
                ...state,
                userSelected: action.userSelected
            }
        case SECURE_TEXT_ENTRY:
            return {
                ...state,
                secureTextEntry: action.secureTextEntry
            }
        case INPUT_IP_ADDRESS:
            return {
                ...state,
                ipAddress: action.ipAddress
            }
        case UPDATE_STATE_BUTTOM:
            return {
                ...state,
                disableButtonCallClient: action.disableButtonCallClient,
                disableButtonInvitePostponeCustomer: action.disableButtonInvitePostponeCustomer,
                disableButtonClientNotEnter: action.disableButtonClientNotEnter,
                disableButtonStartClient: action.disableButtonStartClient,
                disableButtonRedirectClient: action.disableButtonRedirectClient,
                disableButtonPostponeClient: action.disableButtonPostponeClient,
                disableFinishClient: action.disableFinishClient,
                disableButtonExit: action.disableButtonExit
            }
        case TOTAL_LENGTH:
            return {
                ...state,
                totalLength: action.totalLength
            }
        case GET_SOCKET_DATA:
            return {
                ...state,
                socket: action.socket
            }

        default:
            return state
    }
}