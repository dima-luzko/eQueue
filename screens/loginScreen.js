import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, PixelRatio, Alert } from 'react-native'
import { connect } from 'react-redux'
import { usersFetchData } from '../action/usersAction'
import {Picker} from '@react-native-picker/picker'
import { Text, Thumbnail, Input, Item } from 'native-base';
import Logo from '../images/logo.png'
import { Button } from 'react-native-elements'
import { loggedUser } from '../action/loggedUserAction'
import { getSelfServices } from '../action/selfServicesAction'
import { passwordState, userState, showPassword } from '../action/updateStateAction'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DoubleClick from 'react-native-double-tap'
import { checkServerState } from '../action/serverStateAction'


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


class LoginScreen extends Component {


  errorPasswordAlert() {
    Alert.alert(
      "Ошибка",
      "Неверно введен пароль!",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  errorUserAlert() {
    Alert.alert(
      "Ошибка",
      "Сначала необходимо выбрать пользователя!",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }


  LoginCheck = () => {
    const { users } = this.props.users

    users.forEach(user => {
      if (this.props.userSelected.userSelected === user.id)
        if (this.props.password.password === user.password || user.password === "") {
          this.props.navigation.navigate('CallClient')
          this.props.loggedUser(user)
        } else {
          this.errorPasswordAlert()
        }
    })
  }

  componentDidMount() {
    this.props.usersFetchData()
        this.check()
  }



  check() {
    
    setInterval(() => {
      this.props.checkServerState(this.props.ipAddress.ipAddress)
      setTimeout(() => {
        
        if (this.props.server.server) {
          console.log("Соединение с сервером установлено!")
          
        } else {
          console.error("Нет соединения с сервером!")
            this.props.navigation.navigate("ErrorConnectToServer")
        }

        // switch (this.props.server.server) {
        //   case true:
        //     return (

        //       console.log("OK!!!!!!")
        //     )

        //   case false:
        //     return (
        //       console.log("NOOOOO!!!!!!"),
        //       this.props.navigation.navigate("ErrorConnectToServer")
        //     )
        //   // default:
        //   // return (
        //   //   console.log("default!!!!!!"),
        //   //   store.dispatch({ type: 'CHECK_SERVER_STATE', payload: false })
        //   // )

        // }
      }, 100);
    }, 2000);


  }

  renderPicker() {
    const { users } = this.props.users
    if (users && users.length > 0) {
      return (
        <View style={styles.inputStyle}>
          <Picker
            style={styles.inputText}
            selectedValue={this.props.userSelected.userSelected}
            onValueChange={(itemValue) => this.props.userState(itemValue)} >
            <Picker.Item label="Выберите пользователя..." value='default' />
            {users.map((item, key) =>
              <Picker.Item
                label={item.name} value={item.id} key={key} />
            )}
          </Picker>
        </View>
      )
    } else {
      return (
        <View style={styles.inputStyle}>
          <Picker style={styles.inputText}>
            <Picker.Item label="Выберите пользователя..." value='default' />
          </Picker>
        </View>
      )
    }
  }

  updateSecurityTextEntry = () => {
    this.props.showPassword(!this.props.secureTextEntry.secureTextEntry)
  }

  render() {
    return (

      <DoubleClick
        // singleTap={() => {
        //   console.log("single tap");
        // }}
        doubleTap={() => {
          this.props.navigation.replace('ConnectingToIP')
        }}
        delay={200}
      >

        <View style={styles.container}>
          <View style={styles.logoStyle}>
            <Thumbnail circular large source={Logo} />
            <Text style={styles.textLogoStyle}>React Native</Text>
          </View>
          <View style={styles.formLoginStyle}>
            {this.renderPicker()}
            <View style={styles.inputStyle}>
              <Item>
                <Input
                  value={this.props.password.password}
                  onChangeText={(value) => this.props.passwordState(value)}
                  style={styles.inputText}
                  placeholder="Пароль..."
                  placeholderTextColor="#003f5c"
                  secureTextEntry={this.props.secureTextEntry.secureTextEntry ? true : false}
                />
                <TouchableOpacity
                  onPress={this.updateSecurityTextEntry}
                >
                  {this.props.secureTextEntry.secureTextEntry ?
                    <Icon
                      name="eye-slash"
                      size={3 * widthPercentageToDP("2.5%")}
                      color="white"
                      style={{
                        marginLeft: widthPercentageToDP('2%')
                      }} />
                    :
                    <Icon
                      name="eye"
                      size={3 * widthPercentageToDP("2.5%")}
                      color="white"
                      style={{
                        marginLeft: widthPercentageToDP('2%')
                      }} />
                  }

                </TouchableOpacity>
              </Item>
            </View>
            <View>
              <Button
                title="Войти"
                buttonStyle={{
                  backgroundColor: '#fb5b5a'
                }}

                containerStyle={{
                  borderRadius: 25,
                  width: widthPercentageToDP('72%'),
                  alignSelf: 'center'
                }}

                titleStyle={{
                  fontSize: heightPercentageToDP('2.4%'),
                  color: 'white',
                  textAlignVertical: 'center'
                }}

                onPress={() => {
                  this.LoginCheck(),
                    this.props.userSelected.userSelected ? this.props.userSelected.userSelected : this.errorUserAlert()
                }} />
            </View>

          </View>

        </View>
      </DoubleClick>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#003f5c',
    height: "100%",
    padding: 24

  },

  logoStyle: {
    marginTop: heightPercentageToDP('20%'),
    marginBottom: heightPercentageToDP('8%'),
    alignItems: 'center',
    justifyContent: 'center',

  },

  textLogoStyle: {
    marginTop: heightPercentageToDP('3%'),
    fontSize: heightPercentageToDP('2.1%'),
    color: 'white'
  },

  formLoginStyle: {
    marginTop: heightPercentageToDP('-5%'),
    alignItems: 'center',
    alignSelf: 'center'


  },

  inputStyle: {
    width: widthPercentageToDP('72%'),
    backgroundColor: "#465881",
    borderRadius: 25,
    height: heightPercentageToDP('6%'),
    marginBottom: heightPercentageToDP('2%'),
    justifyContent: "center",
    padding: heightPercentageToDP('2%'),

  },

  inputText: {
    height: heightPercentageToDP('6%'),
    color: "white"
  }

});

const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user,
    selfServices: state.selfServices,
    password: state.password,
    userSelected: state.userSelected,
    secureTextEntry: state.secureTextEntry,
    ipAddress: state.ipAddress,
    server: state.server
  };
};

const mapDispatchToProps = dispatch => {
  return {
    usersFetchData: () => dispatch(usersFetchData()),
    loggedUser: (user) => dispatch(loggedUser(user)),
    getSelfServices: (userId, point) => dispatch(getSelfServices(userId, point)),
    passwordState: (password) => dispatch(passwordState(password)),
    userState: (userSelected) => dispatch(userState(userSelected)),
    showPassword: (secureTextEntry) => dispatch(showPassword(secureTextEntry)),
    checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


