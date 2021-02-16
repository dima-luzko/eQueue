import { USERS_FETCHING_DATA_SUCCESS, USERS_FETCHING_DATA_FAIL } from '../constants/constants'

const initialState = {
    users: [],
    isFetching: false,
    error: false
}

export default usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_FETCHING_DATA_SUCCESS:
            return {
                ...state,
                users: action.users,
                isFetching: false
            }
        case USERS_FETCHING_DATA_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}