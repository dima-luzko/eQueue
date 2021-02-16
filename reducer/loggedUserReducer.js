import { LOGGED_USER, CHANGE_FLEX_PRIORITY } from '../constants/constants'

const initialState = {
    user: {},
    changeFlexPriority: undefined
}

export default loggedUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_USER:
            return {
                ...state,
                user: action.user
            }
        case CHANGE_FLEX_PRIORITY:
            return {
                ...state,
                changeFlexPriority: action.changeFlexPriority
            }
        default:
            return state
    }
}