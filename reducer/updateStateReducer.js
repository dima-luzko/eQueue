import {
    POSTPONED_TOTAL_LENGTH, UPDATE_TEXT, UPDATE_IMAGE,
    UPDATE_STATE_BUTTOM, PASSWORD, SELECT_USER,
    SECURE_TEXT_ENTRY, INPUT_IP_ADDRESS, TOTAL_LENGTH,
    GET_SOCKET_DATA, TOTAL_MINUTES, TEXT_1, TEXT_2,
    TEXT_3, TEXT_4, TEXT_5, POSTPONED_CHECK, REDIRECT_CHECK
} from '../constants/constants'

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
    ipAddress: null,
    socket: undefined,
    totalLength: 0,
    totalMinutes: 0,
    posponedLength: 0,
    text_1: null,
    text_2: null,
    text_3: null,
    text_4: null,
    text_5: null,
    redirectCheckButton: true,
    postponedCheckButton: true
}

export default updateStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTPONED_CHECK:
            return {
                ...state,
                postponedCheckButton: action.postponedCheckButton
            }
        case REDIRECT_CHECK:
            return {
                ...state,
                redirectCheckButton: action.redirectCheckButton
            }
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

        case POSTPONED_TOTAL_LENGTH:
            return {
                ...state,
                posponedLength: action.posponedLength
            }

        case TOTAL_MINUTES:
            return {
                ...state,
                totalMinutes: action.totalMinutes
            }
        case GET_SOCKET_DATA:
            return {
                ...state,
                socket: action.socket
            }
        case TEXT_1:
            return {
                ...state,
                text_1: action.text_1
            }
        case TEXT_2:
            return {
                ...state,
                text_2: action.text_2
            }
        case TEXT_3:
            return {
                ...state,
                text_3: action.text_3
            }
        case TEXT_4:
            return {
                ...state,
                text_4: action.text_4
            }
        case TEXT_5:
            return {
                ...state,
                text_5: action.text_5
            }

        default:
            return state
    }
}