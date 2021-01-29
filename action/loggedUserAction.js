export const getLoggedUser = user => {
    return {
        type: "LOGGED_USER",
        user
    }
}


export const loggedUser = (user) =>{
    return (dispatch) =>{
        
            dispatch(getLoggedUser(user))
         
    }
    }