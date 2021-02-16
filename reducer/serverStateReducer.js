import { CHECK_SERVER_STATE, SERVER_STATE_ERROR } from '../constants/constants'

const initialState = {
    server: false
}

export default serverStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_SERVER_STATE:
            return {
                server: true

            }
        case SERVER_STATE_ERROR:
            return {
                server: false
            }

        default:
            return state
    }
}