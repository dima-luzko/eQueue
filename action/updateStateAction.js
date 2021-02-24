export const changeText = text => {
    return {
        type: "UPDATE_TEXT",
        text
    }
}

export const changeImage = image => {
    return {
        type: "UPDATE_IMAGE",
        image
    }
}

export const inputPassword = password => {
    return {
        type: "PASSWORD",
        password
    }
}

export const secureText = secureTextEntry => {
    return {
        type: "SECURE_TEXT_ENTRY",
        secureTextEntry
    }
}

export const selectUser = userSelected => {
    return {
        type: "SELECT_USER",
        userSelected
    }
}

export const changeDisableButtom = (

    disableButtonCallClient,
    disableButtonInvitePostponeCustomer,
    disableButtonClientNotEnter,
    disableButtonStartClient,
    disableButtonRedirectClient,
    disableButtonPostponeClient,
    disableFinishClient,
    disableButtonExit
) => {
    return {
        type: "UPDATE_STATE_BUTTOM",
        disableButtonCallClient,
        disableButtonInvitePostponeCustomer,
        disableButtonClientNotEnter,
        disableButtonStartClient,
        disableButtonRedirectClient,
        disableButtonPostponeClient,
        disableFinishClient,
        disableButtonExit
    }
}

export const inputIpAdress = ipAddress => {
    return {
        type: "INPUT_IP_ADDRESS",
        ipAddress
    }
}

export const socketData = socket => {
    return {
        type: "GET_SOCKET_DATA",
        socket
    }
}

export const getSocketData = (socket) => {
    return (dispatch) => {
        dispatch(socketData(socket))
    }
}

export const totalMinutesToPostponeClient = totalMinutes => {
    return {
        type: "TOTAL_MINUTES",
        totalMinutes
    }
}

export const text1 = text_1 => {
    return {
        type: "TEXT_1",
        text_1
    }
}

export const changeText1 = (text_1) => {
    return (dispatch) => {
        dispatch(text1(text_1))
    }
}

export const text2 = text_2 => {
    return {
        type: "TEXT_2",
        text_2
    }
}

export const changeText2 = (text_2) => {
    return (dispatch) => {
        dispatch(text2(text_2))
    }
}

export const text3 = text_3 => {
    return {
        type: "TEXT_3",
        text_3
    }
}

export const changeText3 = (text_3) => {
    return (dispatch) => {
        dispatch(text3(text_3))
    }
}

export const text4 = text_4 => {
    return {
        type: "TEXT_4",
        text_4
    }
}

export const changeText4 = (text_4) => {
    return (dispatch) => {
        dispatch(text4(text_4))
    }
}

export const changeTotalMinutes = (totalMinutes) => {
    return (dispatch) => {
        dispatch(totalMinutesToPostponeClient(totalMinutes))
    }
}

export const total = totalLength => {
    return {
        type: "TOTAL_LENGTH",
        totalLength
    }
}

export const showTotalLength = (totalLength) => {
    return (dispatch) => {
        dispatch(total(totalLength))
    }
}

export const postponedTotal = posponedLength => {
    return {
        type: "POSTPONED_TOTAL_LENGTH",
        posponedLength
    }
}

export const showPostponedTotalLength = (posponedLength) => {
    return (dispatch) => {
        dispatch(postponedTotal(posponedLength))
    }
}

export const selectIpAddress = (ipAddress) => {
    return (dispatch) => {
        dispatch(inputIpAdress(ipAddress))
    }
}

export const passwordState = (password) => {
    return (dispatch) => {
        dispatch(inputPassword(password))
    }
}

export const showPassword = (secureTextEntry) => {
    return (dispatch) => {
        dispatch(secureText(secureTextEntry))
    }
}

export const userState = (userSelected) => {
    return (dispatch) => {
        dispatch(selectUser(userSelected))
    }
}

export const updateText = (text) => {
    return (dispatch) => {
        dispatch(changeText(text))
    }
}

export const updateImage = (image) => {
    return (dispatch) => {
        dispatch(changeImage(image))
    }
}

export const updateDisableButtom = (
    disableButtonCallClient,
    disableButtonInvitePostponeCustomer,
    disableButtonClientNotEnter,
    disableButtonStartClient,
    disableButtonRedirectClient,
    disableButtonPostponeClient,
    disableFinishClient,
    disableButtonExit
) => {
    return (dispatch) => {
        dispatch(changeDisableButtom(
            disableButtonCallClient,
            disableButtonInvitePostponeCustomer,
            disableButtonClientNotEnter,
            disableButtonStartClient,
            disableButtonRedirectClient,
            disableButtonPostponeClient,
            disableFinishClient,
            disableButtonExit
        ))
    }
}

