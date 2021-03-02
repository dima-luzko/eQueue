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

export const serverStateCheck = () => {
    return {
        type: "SERVER_STATE"
    }
}

export const setServerState = () => {
    return (dispatch) => {
        dispatch(serverStateCheck())
    }
}



export const serverControl = (control) => {
    return (dispatch) => {
        dispatch(server(control))
    }
}

export const checkServerState = (ipAddress) => {
    return (dispatch) => {
        fetch("http://" + ipAddress + ":8084/api" + SERVER_STATE_URL)
            .then((result) => {
                console.log("Success: ",result.status,"","http://" + ipAddress + ":8084/api" + SERVER_STATE_URL);
                result.status === 200 ?
                dispatch(serverState()) : dispatch(serverStateError())
            })
            .catch(() => {
                console.log("Error: ","","http://" + ipAddress + ":8084/api" + SERVER_STATE_URL);
                dispatch(serverStateError())
            });
    }
}