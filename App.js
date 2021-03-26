import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { Provider } from 'react-redux'
import LoginScreen from './screens/loginScreen'
import CallClient from './components/BasicButtom'
import RedirectCustomer from './screens/redirectCustomerScreen'
import CustomerToPostpone from './screens/customerToPostponeScreen'
import InvitePostponeCustomer from './screens/invitePostponeCustomerScreen'
import ResultList from './screens/resultListScreen'
import SplashScreen from './screens/splashScreen'
import ConnectingToIP from './screens/ConnectingToIPScreen'
import ErrorConnectToServer from './screens/errorConnectToServerScreen'
import ServerNoConnection from './screens/serverNoConnectionScreen'
import ServerConnection from './screens/serverConnectionScreen'
import Setting from './screens/settingScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const storeWithApplyMiddleware = applyMiddleware(thunk)(createStore)
const store = storeWithApplyMiddleware(reducer)
const Stack = createStackNavigator();
export { store }


export default class App extends Component {


  render() {
    return (
      <Provider store={store}>

        <NavigationContainer >
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >

            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
            />

            <Stack.Screen
              name="ErrorConnectToServer"
              component={ErrorConnectToServer}
            />

            <Stack.Screen
              name="ConnectingToIP"
              component={ConnectingToIP} />

            <Stack.Screen
              name="ServerConnection"
              component={ServerConnection} />

            <Stack.Screen
              name="ServerNoConnection"
              component={ServerNoConnection} />

            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen} />

            <Stack.Screen
              name="CallClient"
              component={CallClient} />

            <Stack.Screen
              name="RedirectCustomer"
              component={RedirectCustomer} />

            <Stack.Screen
              name="CustomerToPostpone"
              component={CustomerToPostpone} />

            <Stack.Screen
              name="InvitePostponeCustomer"
              component={InvitePostponeCustomer} />

            <Stack.Screen
              name="ResultList"
              component={ResultList} />

            <Stack.Screen
              name="Setting"
              component={Setting}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    )
  }
}


