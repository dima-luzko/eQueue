import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import loggedUserReducer from '../reducer/loggedUserReducer'
import callClientReducer from '../reducer/callClientReducer'
import selfServicesReducer from '../reducer/selfServicesReducer'
import getServicesReducer from '../reducer/getServicesReducer'
import resultListReducer from '../reducer/resultListReducer'
import updateStateReducer from '../reducer/updateStateReducer'
import serverStateReducer from '../reducer/serverStateReducer'




export default combineReducers({
    users: usersReducer,
    user: loggedUserReducer,
    customer: callClientReducer,
    selfServices: selfServicesReducer,
    services: getServicesReducer,
    postponeCustomer: callClientReducer,
    resultList: resultListReducer,
    changeFlexPriority: loggedUserReducer,
    text: updateStateReducer,
    image: updateStateReducer,
    disableButtonCallClient: updateStateReducer,
    disableButtonInvitePostponeCustomer: updateStateReducer,
    disableButtonClientNotEnter: updateStateReducer,
    disableButtonStartClient: updateStateReducer,
    disableButtonRedirectClient: updateStateReducer,
    disableButtonPostponeClient: updateStateReducer,
    disableFinishClient: updateStateReducer,
    disableButtonExit: updateStateReducer,
    password : updateStateReducer,
    userSelected: updateStateReducer,
    secureTextEntry: updateStateReducer,
    ipAddress: updateStateReducer,
    server : serverStateReducer,
    socket: updateStateReducer,
    totalLength: updateStateReducer,
    totalMinutes: updateStateReducer

})