import { GET_RESULT_LIST } from '../constants/constants'

const initialState = {
    resultList: undefined
}

export default resultListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESULT_LIST:
            return {
                ...state,
                resultList: action.resultList,
            }
        default:
            return state
    }
}