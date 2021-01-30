import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, PixelRatio, Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { usersFetchData } from '../action/usersAction'
import { Picker } from '@react-native-picker/picker'
import { Input, Item } from 'native-base';
import { Button } from 'react-native-elements'
import { loggedUser } from '../action/loggedUserAction'
import { getSelfServices } from '../action/selfServicesAction'
import { passwordState, userState, showPassword } from '../action/updateStateAction'
import EyeIcon from 'react-native-vector-icons/Octicons'
import TriangleIcon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DoubleClick from 'react-native-double-tap'
import { checkServerState } from '../action/serverStateAction'
import LinearGradient from 'react-native-linear-gradient'

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
    //this.check()
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
      }, 100);
    }, 2000);
  }

  renderPicker() {
    const { users } = this.props.users
    if (users && users.length > 0) {
      return (
        <View style={styles.pickerStyle}>
          <Picker
            style={styles.pickerText}
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
        <View style={styles.pickerStyle}>
          <Picker
            style={styles.pickerText}
            itemStyle={{
              backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17
            }}
          >
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
      <LinearGradient
        colors={["rgba(255, 51, 88, 0.4) 0%", "rgba(205, 72, 176, 0.4) 100%"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <DoubleClick
          doubleTap={() => {
            this.props.navigation.replace('ConnectingToIP')
          }}
          delay={200}
        >

          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={
                require('../images/logo_equeue.png')
              }
            />

            {this.renderPicker()}

            {/* <View>
              <TriangleIcon
                name="arrow-drop-down"
                size={4 * widthPercentageToDP("2.5%")}
                color="green"
                style={{
                  marginStart: widthPercentageToDP('59%'),
                  marginVertical: heightPercentageToDP('-7%')
                }} />
            </View> */}

            <Item style={styles.passwordStyle}>
              <Input
                value={this.props.password.password}
                onChangeText={(value) => this.props.passwordState(value)}
                style={styles.passwordText}
                placeholder="Пароль..."
                placeholderTextColor="#A2A0A0"
                secureTextEntry={this.props.secureTextEntry.secureTextEntry ? true : false}
              />
              <TouchableOpacity
                onPress={this.updateSecurityTextEntry}
              >
                {this.props.secureTextEntry.secureTextEntry ?
                  <EyeIcon
                    name="eye-closed"
                    size={2 * widthPercentageToDP("2.5%")}
                    color="rgba(188, 182, 185, 0.7)"
                    style={{
                      paddingRight: heightPercentageToDP('2%')
                    }} />
                  :
                  <EyeIcon
                    name="eye"
                    size={2 * widthPercentageToDP("2.5%")}
                    color="rgba(188, 182, 185, 0.7)"
                    style={{
                      paddingRight: heightPercentageToDP('2%')
                    }} />
                }
              </TouchableOpacity>
            </Item>

            <Button
              title="Войти"
              buttonStyle={{
                width: widthPercentageToDP('72%'),
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 8,
                height: heightPercentageToDP('4.5%')
              }}

              titleStyle={{
                fontSize: heightPercentageToDP('2%'),
                color: '#A1A0A0'
              }}

              onPress={() => {
                this.LoginCheck(),
                  this.props.userSelected.userSelected ? this.props.userSelected.userSelected : this.errorUserAlert()
              }} />
          </View>
        </DoubleClick>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  logo: {
    marginTop: heightPercentageToDP('30%'),
    height: heightPercentageToDP('6%'),
    marginBottom: heightPercentageToDP('7%'),
    resizeMode: 'contain'
  },

  passwordStyle: {
    width: widthPercentageToDP('72%'),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    height: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('2.5%')
  },

  passwordText: {
    marginLeft: widthPercentageToDP('25%'),
    fontSize: heightPercentageToDP('2%')
  },

  pickerStyle: {
    width: widthPercentageToDP('72%'),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    height: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('2.5%'),
    justifyContent: "center",
    paddingRight: heightPercentageToDP('2%')
  },

  pickerText: {
    height: heightPercentageToDP('6%'),
    color: "#A2A0A0",
    marginLeft: widthPercentageToDP('10%')
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


