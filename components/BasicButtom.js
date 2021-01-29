import React, { Component } from 'react'
import { Button } from 'react-native-elements';
import { View, Text } from 'native-base';
import { Image, StyleSheet, PixelRatio, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { inviteNextCustomer, getStartCustomer } from '../action/callClientAction'
import { loggedUser } from '../action/loggedUserAction'
import { getSelfServices } from '../action/selfServicesAction'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Appbar } from 'react-native-paper'
import { killNextCustomer } from '../action/killNextCustomerAction';
import { updateText, updateDisableButtom, updateImage, passwordState,userState,showPassword,getSocketData,showTotalLength} from '../action/updateStateAction'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
import { SOCKET_URL } from '../constants/url'
import {store} from '../App'


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
        console.log("Количество человек в очереди: ", queueLength ? queueLength : "Клиентов нет!")
      }
      this.props.showTotalLength(queueLength)

    }, 100)
  }


  changeImage() {
    switch (this.props.image.image) {
      case 0:
        return (
          <Image
            style={styles.imageCircle}
            source={
              require('../images/redCircle.png')
            }
          />
        )
      case 1:
        return (
          <Image
            style={styles.imageCircle}
            source={
              require('../images/yellowCircle.png')
            }
          />
        )
      case 2:
        return (
          <Image
            style={styles.imageCircle}
            source={
              require('../images/greenCircle.png')
            }
          />
        )
    }
  }

  changeText() {
    switch (this.props.text.text) {
      case 0:
        return (
          <Text style={styles.textClient}>Клиент не вызван:</Text>
        )
      case 1:
        return (
          <Text style={styles.textClient}>Приглашен клиент:</Text>
        )
      case 2:
        return (
          <Text style={styles.textClientStart}>Начата работа с клиентом:</Text>
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
    }, (error) => {
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
      <View style={{ flex: 1, backgroundColor: "#f8f8ff" }}>
        <View>
          <Appbar.Header
            style={{
              backgroundColor: '#003f5c',
              height: heightPercentageToDP('8%')
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ChangeFlexPriority')
              }}
            >
              <Icon
                name="user"
                size={3*widthPercentageToDP("2.5%")}
                color="white"
                style={{
                  marginLeft: widthPercentageToDP("2%")
                }} />
            </TouchableOpacity>
            <Appbar.Content
              titleStyle={{
                fontSize: heightPercentageToDP('2.8%'),
                marginLeft: "1%"
              }}
              subtitleStyle={{
                fontSize: heightPercentageToDP('2%'),
                marginLeft: "1%"
              }}
              title={"Окно: " + this.props.user.user.point}
              subtitle={'Оператор: ' + this.props.user.user.name}
            />
            <Button
              disabled={this.props.disableButtonExit.disableButtonExit}
              title="Выход"
              buttonStyle={{
                backgroundColor: '#b22222'
              }}
              titleStyle={{
                fontSize: heightPercentageToDP('2%'),
                color: 'white',
              }}
              containerStyle={{
                width: widthPercentageToDP('18%'),
                marginEnd: widthPercentageToDP('5%')
              }}


              onPress={() => {
                this.props.navigation.replace('LoginScreen'),
                this.props.userState(""),
                this.props.passwordState(""),
                this.props.showPassword(true)

              }}

            />
          </Appbar.Header>
        </View>
        <Text style={styles.valueInQueue}>Всего клиентов в очереди: {this.props.totalLength.totalLength ? this.props.totalLength.totalLength : "Клиентов нет!"} </Text>
        {this.changeImage()}
        {this.changeText()}
        <View>
          <Text style={styles.number}>{this.props.customer.customer ? this.props.customer.customer.prefix + this.props.customer.customer.number : ""}</Text>
          <View style={styles.services}>
            <Text >{this.props.customer.customer ? this.props.customer.customer.to_service.name : ""}</Text>
          </View>
          <View style={styles.description}>
            <Text >{this.props.customer.customer ? this.props.customer.customer.to_service.description : ""}</Text>
          </View>
          <View>
            <Button
              disabled={this.props.disableButtonCallClient.disableButtonCallClient}
              title="Вызвать следующего клиента"
              buttonStyle={{
                backgroundColor: 'black'
              }}

              containerStyle={{
                borderRadius: 15,
                width: widthPercentageToDP('72%'),
                alignSelf: 'center',
                marginTop: heightPercentageToDP('12%'),
                marginBottom: "2%"
              }}

              titleStyle={{
                fontSize: heightPercentageToDP('2%'),
                color: 'gold'
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
              disabled={this.props.disableButtonInvitePostponeCustomer.disableButtonInvitePostponeCustomer}
              title="Посмотреть отложенных клиентов"
              buttonStyle={{
                backgroundColor: 'black'
              }}

              containerStyle={{
                borderRadius: 15,
                width: widthPercentageToDP('72%'),
                marginBottom: '2%',
                alignSelf: 'center'
              }}

              titleStyle={{
                fontSize: heightPercentageToDP('2%'),
                color: 'gold'
              }}
              onPress={() => {
                this.props.navigation.navigate('InvitePostponeCustomer')
              }}
            />
          </View>
        </View>
        <View>
          <Button
            disabled={this.props.disableButtonClientNotEnter.disableButtonClientNotEnter}
            title="Клиент не явился"
            buttonStyle={{
              backgroundColor: 'black'
            }}

            containerStyle={{
              borderRadius: 15,
              width: widthPercentageToDP('72%'),
              marginBottom: "2%",
              alignSelf: 'center'
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('2%'),
              color: 'gold'
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
            disabled={this.props.disableButtonStartClient.disableButtonStartClient}
            title="Начать работу с клиентом"
            buttonStyle={{
              backgroundColor: 'black'
            }}

            containerStyle={{
              borderRadius: 15,
              width: widthPercentageToDP('72%'),
              marginBottom: "2%",
              alignSelf: 'center'
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('2%'),
              color: 'gold'
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
            disabled={this.props.disableButtonRedirectClient.disableButtonRedirectClient}
            title="Перенаправить клиента"
            buttonStyle={{
              backgroundColor: 'black'
            }}

            containerStyle={{
              borderRadius: 15,
              width: widthPercentageToDP('72%'),
              marginBottom: '2%',
              alignSelf: 'center'
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('2%'),
              color: 'gold'
            }}
            onPress={() => {
              this.props.navigation.navigate('RedirectCustomer')


            }}
          />
        </View>

        <View>
          <Button
            disabled={this.props.disableButtonPostponeClient.disableButtonPostponeClient}
            title="Отложить клиента"
            buttonStyle={{
              backgroundColor: 'black'
            }}

            containerStyle={{
              borderRadius: 15,
              width: widthPercentageToDP('72%'),
              marginBottom: '2%',
              alignSelf: 'center'
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('2%'),
              color: 'gold'
            }}
            onPress={() => {
              this.props.navigation.navigate('CustomerToPostpone')
            }}
          />
        </View>

        <View>
          <Button
            disabled={this.props.disableFinishClient.disableFinishClient}
            title="Закончить работу с клиентом"
            buttonStyle={{
              backgroundColor: 'black'
            }}

            containerStyle={{
              borderRadius: 15,
              width: widthPercentageToDP('72%'),
              marginBottom: '2%',
              alignSelf: 'center'
            }}

            titleStyle={{
              fontSize: heightPercentageToDP('2%'),
              color: 'gold'
            }}
            onPress={() => {
              this.props.navigation.navigate('ResultList')
            }}
          />
        </View>
      </View>
    );

  };
}


const styles = StyleSheet.create({
  pickerStyle: {
    width: widthPercentageToDP('73%'),
    marginLeft: widthPercentageToDP('16%'),

  },


  imageCircle: {
    height: heightPercentageToDP('2.5%'),
    width: widthPercentageToDP('4.5%'),
    marginVertical: heightPercentageToDP('8.5%'),
    marginLeft: "15%"
  },

  textClient: {
    marginVertical: heightPercentageToDP('-11%'),
    textAlign: 'center',
    fontSize: heightPercentageToDP('2%')
  },

  textClientStart: {
    textAlign: 'center',
    marginStart: "5%",
    marginVertical: heightPercentageToDP('-11%'),
    fontSize: heightPercentageToDP('2%')
  },

  valueInQueue: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2%'),
    height: heightPercentageToDP('3%')
  },

  number: {
    marginStart: "5%",
    marginTop: heightPercentageToDP('13%'),
    fontWeight: 'bold',
    fontSize: heightPercentageToDP('2%')
  },

  services: {
    marginStart: "16%",
    marginTop: heightPercentageToDP('-3%'),
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
    marginLeft: widthPercentageToDP('35%'),

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
    showPassword: (secureTextEntry) =>dispatch(showPassword(secureTextEntry)),
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
