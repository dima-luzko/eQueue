import { GET_NEXT_CUSTOMER_INFO_URL } from '../constants/url'
import { store } from '../App'

export const getNextCustomer = nextCustomer => {
    return {
        type: "GET_NEXT_CUSTOMER_INFO",
        nextCustomer
    }
}


export const getNextCustomerInfo = (loggedUserId) => {
    return (dispatch) => {
        fetch(store.getState().ipAddress.ipAddress + GET_NEXT_CUSTOMER_INFO_URL + loggedUserId, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(  
            function(response) {  
              if (response.status !== 200) {  
                dispatch(getNextCustomer(null))
                return;  
              }
              response.json().then(function(data) {  
                dispatch(getNextCustomer(data))
              });  
            }  
          )
    }
}

