import { SERVER_STATE_URL } from '../constants/url'

export const serverState = () => {

    return {
        type: "CHECK_SERVER_STATE",
    }
}

export const serverStateError = () => {
    return {
        type: "SERVER_STATE_ERROR",
    }
}

export const server = control => {
    return {
        type: "SERVER_CONTROL",
        control
    }
}

export const serverControl = (control) => {
    return (dispatch) => {
        dispatch(server(control))
    }
}

export const checkServerState = (ipAddress) => {
    return (dispatch) => {
        fetch("http://" + ipAddress + ":8081/api" + SERVER_STATE_URL)
            .then((result) => {
                result.status === 200 ?
                dispatch(serverState()) : dispatch(serverStateError())
            })
            .catch(() => {
                dispatch(serverStateError())
            });
    }
}