import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View, Text } from 'native-base';
import { StyleSheet, PixelRatio, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { inviteNextCustomer, getStartCustomer } from '../action/callClientAction'
import { loggedUser } from '../action/loggedUserAction'
import { getSelfServices } from '../action/selfServicesAction'
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper'
import { killNextCustomer } from '../action/killNextCustomerAction';
import { updateText, updateDisableButtom, updateImage, passwordState, userState, showPassword, getSocketData, showTotalLength } from '../action/updateStateAction'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
import { SOCKET_URL } from '../constants/url'
import { store } from '../App'
import LinearGradient from 'react-native-linear-gradient'
import UserIcon from 'react-native-vector-icons/FontAwesome'

const Export = function (props) {
  const navigation = useNavigation();

  return <ResultList {...props} navigation={navigation} />;
}

export {
  Export
}

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
export {
  widthPercentageToDP,
  heightPercentageToDP
};


let timeout = 5000;
let timeoutCounter = 0;
const maxTimeoutCounter = 10;

class CallClient extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      connecting: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    let queueLength = 0;
    this.props.getSelfServices(this.props.user.user.id, '');
    setTimeout(() => {
      if (this.props.selfServices.selfServices.self_services && this.props.selfServices.selfServices.self_services.length > 0) {
        this.props.selfServices.selfServices.self_services.forEach(value => {
          queueLength += value.line.length

        })
        console.log("Общее количество клиентов в очереди: ", queueLength ? queueLength : "0")
      }
      this.props.showTotalLength(queueLength)

    }, 200)
  }

  changeText() {
    switch (this.props.text.text) {
      case 0:
        return (
          <LinearGradient
            style={styles.clientCallingForm}
            colors={["rgba(254, 141, 161, 0.8) 0%", "rgba(72, 93, 205, 0.56) 100%"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.textClient}>Клиент не вызван</Text>
          </LinearGradient>

        )
      case 1:
        return (
          <LinearGradient
            style={styles.clientCallingForm}
            colors={["rgba(186, 231, 253, 1)", "rgba(108, 202, 255, 1)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.textClient}>Приглашен клиент</Text>
          </LinearGradient>

        )
      case 2:
        return (
          <LinearGradient
            style={styles.clientCallingForm}
            colors={["rgba(129,255,179,1) 0%", "rgba(120,206,255,1) 100%"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.textClient}>Работа с клиентом</Text>
          </LinearGradient>

        )
    }
  }

  connectingToSocket = () => {

    const ws = new SockJS("http://" + store.getState().ipAddress.ipAddress + ":8081" + SOCKET_URL);
    this.stompClient = Stomp.over(ws);

    let that = this;
    let states = this.props;
    let users = this.props;

    that.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe("/topic/" + users.user.user.id, (message) => {

        const data = JSON.parse(message.body);
        let len = 0;

        if (data.self_services && data.self_services.length > 0) {
          data.self_services.forEach(value => {
            len += value.line.length
          })
        }
        states.getSocketData(data)
        states.showTotalLength(len)
        console.log("+++++++ " + len);
      });
    }, () => {
      timeoutCounter++;

      if (timeoutCounter < maxTimeoutCounter) {
        setTimeout(connect, timeoutCounter * timeout);
      }

    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  UNSAFE_componentWillMount() {
    if (this.state.connecting) {
      this.connectingToSocket();
      this.setState({ connecting: false });
    };

  }

  render() {
    return (

      <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
        <LinearGradient
          colors={["rgba(254, 141, 161, 0.8) 0%", "rgba(72, 93, 205, 0.56) 100%"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Appbar.Header
            style={{
              backgroundColor: 'transparent',
              height: heightPercentageToDP('8%'),
              marginTop: heightPercentageToDP('4%'),
              borderBottomWidth: 1,
              borderBottomColor: "#8C98D3"

            }}
          >
              <UserIcon
                name="user-circle-o"
                size={2 * heightPercentageToDP("3%")}
                color="white"
                style={{
                  marginLeft: widthPercentageToDP('2%')
                }}
              />
              

            <Appbar.Content
              titleStyle={{
                fontSize: heightPercentageToDP('2.5%'),
                marginLeft: widthPercentageToDP('1%'),
                color: "#FFFFFF",
                fontFamily: "Roboto",
                fontWeight: '600'
              }}
              subtitleStyle={{
                fontSize: heightPercentageToDP('2.5%'),
                marginLeft: widthPercentageToDP('1%'),
                color: "#FFFFFF",
                fontFamily: "Roboto",
                fontWeight: 'normal'
              }}
              title={"Окно: " + this.props.user.user.point}
              subtitle={'Оператор: ' + this.props.user.user.name}
            />
            <TouchableOpacity
              disabled={this.props.disableButtonExit.disableButtonExit}
              onPress={() => {
                this.props.navigation.navigate('LoginScreen'),
                  this.props.userState(""),
                  this.props.passwordState(""),
                  this.props.showPassword(true)
              }}
            >
              <Text style={styles.exitText}>Выход</Text>
            </TouchableOpacity>
          </Appbar.Header>
        </LinearGradient>

        <View>
          <Text style={styles.valueInQueue}>Общее количество клиентов в очереди: {this.props.totalLength.totalLength ? this.props.totalLength.totalLength : "0"} </Text>
        </View>

        <View>
          {this.changeText()}
        </View>

        <View>
          <Text style={styles.number} numberOfLines={1}> {this.props.customer.customer ? this.props.customer.customer.prefix + this.props.customer.customer.number : ""}</Text>
        </View>
        <View
          style={{
            width: widthPercentageToDP('90%'),
            height: heightPercentageToDP('10%'),
            marginBottom: heightPercentageToDP('2%')
          }} >
          <Text numberOfLines={3}
            style={styles.services}
          >{this.props.customer.customer ? this.props.customer.customer.to_service.name : ""} </Text>
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.totalLength.totalLength ? this.props.disableButtonCallClient.disableButtonCallClient : true}
            title="Вызвать следующего клиента"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.inviteNextCustomer(this.props.user.user.id),
                this.props.updateText(1),
                this.props.updateImage(1)
              this.props.updateDisableButtom(false, true, false, false, true, true, true, true)
            }}
          />
        </View>
        <View>
          <Button
            raised={true}
            disabled={ this.props.disableButtonInvitePostponeCustomer.disableButtonInvitePostponeCustomer }
            title="Посмотреть отложенных клиентов"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.navigation.navigate('InvitePostponeCustomer')
            }}
          />
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.disableButtonClientNotEnter.disableButtonClientNotEnter}
            title="Клиент не явился"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.killNextCustomer(this.props.user.user.id),
                this.props.updateText(0),
                this.props.updateImage(0),
                this.props.updateDisableButtom(false, false, true, true, true, true, true, false)
            }}
          />
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.disableButtonStartClient.disableButtonStartClient}
            title="Начать работу с клиентом"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.getStartCustomer(this.props.user.user.id)
              this.props.updateText(2),
                this.props.updateImage(2),
                this.props.updateDisableButtom(true, true, true, true, false, false, false, true)
            }}
          />
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.disableButtonRedirectClient.disableButtonRedirectClient}
            title="Перенаправить клиента"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.navigation.navigate('RedirectCustomer')
            }}
          />
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.disableButtonPostponeClient.disableButtonPostponeClient}
            title="Отложить клиента"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.navigation.navigate('CustomerToPostpone')
            }}
          />
        </View>

        <View>
          <Button
            raised={true}
            disabled={this.props.disableFinishClient.disableFinishClient}
            title="Закончить работу с клиентом"
            buttonStyle={{
              backgroundColor: "#41D38D",
              borderRadius: 8,
              width: widthPercentageToDP('65%'),
              height: heightPercentageToDP('4.5%')
            }}

            containerStyle={{
              alignSelf: "center",
              marginBottom: heightPercentageToDP('2%')
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('1.8%'),
              color: "#FFFFFF",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "500",
              fontStyle: "normal",
              fontFamily: "Roboto"
            }}
            onPress={() => {
              this.props.navigation.navigate('ResultList')
            }}
          />
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  userIcon: {
    marginLeft: widthPercentageToDP('2%'),
    width: widthPercentageToDP('9.5%'),
    height: heightPercentageToDP('5%')
  },

  exitText: {
    marginRight: widthPercentageToDP('2%'),
    fontSize: heightPercentageToDP('2.3%'),
    color: "#FFFFFF",
    fontFamily: "Roboto"
  },

  valueInQueue: {
    marginTop: heightPercentageToDP('5%'),
    textAlign: "center",
    fontSize: heightPercentageToDP('2.3%'),
    fontFamily: "Roboto",
    fontWeight: "normal",
    color: "#A1A0A0"
  },

  clientCallingForm: {
    marginTop: heightPercentageToDP('3%'),
    height: heightPercentageToDP('9%'),
    width: widthPercentageToDP('65%'),
    alignSelf: "center",
    borderRadius: 4
  },

  textClient: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('3%'),
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontWeight: "500",
    marginTop: heightPercentageToDP('2%')
  },

  number: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "600",
    marginTop: heightPercentageToDP('3%'),
    fontSize: heightPercentageToDP('2.5%'),
    color: "#A1A0A0"
  },

  services: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: heightPercentageToDP('2.5%'),
    color: "#A1A0A0",
    marginLeft: widthPercentageToDP('11%'),
    textAlign: "center"
  },

  description: {
    marginStart: "16%",
    marginTop: heightPercentageToDP('1%'),
    height: heightPercentageToDP('3%'),
    width: widthPercentageToDP('85%')

  },

  imageBreak: {
    height: heightPercentageToDP('15%'),
    width: widthPercentageToDP('28%'),
    marginTop: heightPercentageToDP('1%'),
    marginLeft: widthPercentageToDP('35%')
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    customer: state.customer,
    selfServices: state.selfServices,
    text: state.text,
    image: state.image,
    disableButtonCallClient: state.disableButtonCallClient,
    disableButtonInvitePostponeCustomer: state.disableButtonInvitePostponeCustomer,
    disableButtonClientNotEnter: state.disableButtonClientNotEnter,
    disableButtonStartClient: state.disableButtonStartClient,
    disableButtonRedirectClient: state.disableButtonRedirectClient,
    disableButtonPostponeClient: state.disableButtonPostponeClient,
    disableFinishClient: state.disableFinishClient,
    disableButtonExit: state.disableButtonExit,
    password: state.password,
    userSelected: state.userSelected,
    secureTextEntry: state.secureTextEntry,
    socket: state.socket,
    totalLength: state.totalLength
  };
};

const mapDispatchToProps = dispatch => {
  return {
    inviteNextCustomer: (loggedUserId) => dispatch(inviteNextCustomer(loggedUserId)),
    getStartCustomer: (loggedUserId) => dispatch(getStartCustomer(loggedUserId)),
    getSelfServices: (userId, point) => dispatch(getSelfServices(userId, point)),
    loggedUser: (user) => dispatch(loggedUser(user)),
    killNextCustomer: (userId) => dispatch(killNextCustomer(userId)),
    updateText: (text) => dispatch(updateText(text)),
    updateImage: (image) => dispatch(updateImage(image)),
    passwordState: (password) => dispatch(passwordState(password)),
    userState: (userSelected) => dispatch(userState(userSelected)),
    showPassword: (secureTextEntry) => dispatch(showPassword(secureTextEntry)),
    getSocketData: (socket) => dispatch(getSocketData(socket)),
    showTotalLength: (totalLength) => dispatch(showTotalLength(totalLength)),
    updateDisableButtom: (
      disableButtonCallClient,
      disableButtonInvitePostponeCustomer,
      disableButtonClientNotEnter,
      disableButtonStartClient,
      disableButtonRedirectClient,
      disableButtonPostponeClient,
      disableFinishClient,
      disableButtonExit
    ) => dispatch(updateDisableButtom(
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
export default connect(mapStateToProps, mapDispatchToProps)(CallClient); 
