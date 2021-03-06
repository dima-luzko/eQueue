import { CHECK_SERVER_STATE, SERVER_STATE_ERROR, SERVER_CONTROL, SERVER_STATE } from '../constants/constants'

const initialState = {
    server: false,
    control: true,

}

export default serverStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_SERVER_STATE:
            return {
                ...state,
                server: true

            }
        case SERVER_STATE_ERROR:
            return {
                ...state,
                server: false
            }
        case SERVER_CONTROL:
            return {
                ...state,
                control: action.control
            }

        case SERVER_STATE:
            return {
                ...state,
                server: false
            }
        default:
            return state
    }
}