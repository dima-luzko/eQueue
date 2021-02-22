import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, PixelRatio, Alert, StatusBar, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { usersFetchData } from '../action/usersAction'
import { Button } from 'react-native-elements'
import { loggedUser } from '../action/loggedUserAction'
import { getSelfServices } from '../action/selfServicesAction'
import { passwordState, userState, showPassword } from '../action/updateStateAction'
import EyeIcon from 'react-native-vector-icons/Octicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DoubleClick from 'react-native-double-tap'
import { checkServerState, serverControl } from '../action/serverStateAction'
import LinearGradient from 'react-native-linear-gradient'
import { Shadow } from 'react-native-neomorph-shadows';
import { Col, Grid } from "react-native-easy-grid"
import RNPickerSelect from 'react-native-picker-select';
import PickerIcon from 'react-native-vector-icons/FontAwesome5'
import { clearInterval } from 'stompjs'
import { selectIpAddress } from '../action/updateStateAction'

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

  constructor() {
    super();
    this.state = {
      pickerValue: undefined,
      control: true
    };
  }

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
    if (this.props.control.control) {
      users.forEach(user => {
        if (this.props.userSelected.userSelected === user.id)
          if (this.props.password.password === user.password || user.password === "") {
            this.props.navigation.replace('CallClient')
            this.props.loggedUser(user)
          } else {
            this.errorPasswordAlert()
          }
      })
    }

  }

  componentDidMount() {
    this.props.usersFetchData()
    // this.check()
    // this.checkTime()
  }

  checkTime(){
    var time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes(),
    second = time.getSeconds()
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(hours, ':', minutes, ':', second)
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

  }

  check() {
    if (this.state.control) {
       setInterval(() => {
        this.setState({ control: false })
        console.log("Рендер текущего ip: ", this.props.ipAddress.ipAddress);
        this.props.checkServerState(this.props.ipAddress.ipAddress)
        if (this.props.control.control && !this.props.server.server) {
          this.props.navigation.navigate("ErrorConnectToServer")
        }
      }, 2000);
    }

  }

  // componentWillUnmount(){
  //   clearInterval(this.val)
  // }

  renderPicker() {
    const { users } = this.props.users
    if (users && users.length > 0) {
      return (
        <View style={styles.pickerStyle}>

          <Shadow
            inner
            style={{
              shadowOffset: { width: 2, height: 2 },
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowRadius: 2,
              width: widthPercentageToDP('72%'),
              borderRadius: 8,
              height: heightPercentageToDP('4.5%')
            }}
          >
            <RNPickerSelect
              value={this.props.userSelected.userSelected}
              style={{ ...pickerSelectStyles }}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <PickerIcon
                  style={{ paddingTop: heightPercentageToDP('0.7%'), marginRight: widthPercentageToDP('2.5%') }}
                  name="angle-down"
                  size={1.5 * heightPercentageToDP("2%")}
                  color="rgba(188, 182, 185, 0.7)"
                />
              }}
              placeholder={{ label: "Выберите пользователя... ", value: null }}
              onValueChange={(itemValue) => this.props.userState(itemValue)}
              items={
                users.map(item => ({
                  label: item.name,
                  value: item.id
                }))
              }
            />
          </Shadow>
        </View>
      )
    } else {
      return (
        <View style={styles.pickerStyle}>
          <Shadow
            inner
            style={{
              shadowOffset: { width: 2, height: 2 },
              shadowColor: "rgba(0, 0, 0, 0.25)",
              shadowRadius: 2,
              width: widthPercentageToDP('72%'),
              borderRadius: 8,
              height: heightPercentageToDP('4.5%')
            }}
          >
            <RNPickerSelect
              value={this.state.pickerValue}
              style={{ ...pickerSelectStyles }}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <PickerIcon
                  style={{ paddingTop: heightPercentageToDP('0.7%'), marginRight: widthPercentageToDP('2.5%') }}
                  name="angle-down"
                  size={1.5 * heightPercentageToDP("2%")}
                  color="rgba(188, 182, 185, 0.7)"
                />
              }}
              placeholder={{}}
              onValueChange={(value) => (console.log(value), this.setState({ pickerValue: value }))}
              items={[
                { label: "Выберите пользователя... ", value: null }
              ]}
            />
          </Shadow>
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
        colors={["rgba(254, 141, 161, 0.8) 0%", "rgba(72, 93, 205, 0.56) 100%"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <DoubleClick
          doubleTap={() => {
            //this.props.selectIpAddress(null),
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

            <View style={styles.passwordStyle}>
              <Shadow
                inner
                style={{
                  shadowOffset: { width: 2, height: 2 },
                  shadowColor: "rgba(0, 0, 0, 0.25)",
                  shadowRadius: 2,
                  width: widthPercentageToDP('72%'),
                  borderRadius: 8,
                  height: heightPercentageToDP('4.5%')
                }}
              >
                <Grid>
                  <Col size={10}>
                    <TextInput
                      maxLength={32}
                      value={this.props.password.password}
                      onChangeText={(value) => this.props.passwordState(value)}
                      style={styles.passwordText}
                      placeholder="Пароль..."
                      placeholderTextColor="#A2A0A0"
                      secureTextEntry={this.props.secureTextEntry.secureTextEntry ? true : false}
                    />
                  </Col>
                  <Col style={{ paddingRight: widthPercentageToDP('0.8%') }}>
                    <TouchableOpacity
                      style={{
                        paddingTop: heightPercentageToDP('1%'),
                        alignItems: "center"
                      }}
                      onPress={this.updateSecurityTextEntry}
                    >
                      {this.props.secureTextEntry.secureTextEntry
                        ?
                        <EyeIcon
                          name="eye-closed"
                          size={1.5 * heightPercentageToDP("2%")}
                          color="rgba(188, 182, 185, 0.7)"
                        />
                        :
                        <EyeIcon
                          name="eye"
                          size={1.5 * heightPercentageToDP("2%")}
                          color="rgba(188, 182, 185, 0.7)"
                        />
                      }

                    </TouchableOpacity>
                  </Col>
                </Grid>
              </Shadow>
            </View>

            <Button
              raised={true}
              title="Войти"
              buttonStyle={{
                width: widthPercentageToDP('72%'),
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 8,
                height: heightPercentageToDP('4.5%')
              }}

              containerStyle={{
                alignItems: "center"
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
    fontSize: heightPercentageToDP('2%'),
    textAlign: "center",
    paddingLeft: widthPercentageToDP('10%'),
    color: "#A2A0A0",
    height: heightPercentageToDP('5.6%'),
    paddingTop: heightPercentageToDP('0.5%')
  },

  pickerStyle: {
    width: widthPercentageToDP('72%'),
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    height: heightPercentageToDP('4.5%'),
    marginBottom: heightPercentageToDP('2.5%')
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: heightPercentageToDP('2.1%'),
    textAlign: "center",
    paddingVertical: heightPercentageToDP('1%'),
    color: "#A2A0A0"
  },
  placeholder: {
    color: "#AFAFAF"
  }
})


const mapStateToProps = state => {
  return {
    users: state.users,
    user: state.user,
    selfServices: state.selfServices,
    password: state.password,
    userSelected: state.userSelected,
    secureTextEntry: state.secureTextEntry,
    ipAddress: state.ipAddress,
    server: state.server,
    control: state.control
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
    checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress)),
    serverControl: (control) => dispatch(serverControl(control)),
    selectIpAddress: (ipAddress) => dispatch(selectIpAddress(ipAddress))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);