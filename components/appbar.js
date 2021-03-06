import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import { connect } from 'react-redux'
import { loggedUser } from '../action/loggedUserAction'
import { PixelRatio, Dimensions, Image, StyleSheet, StatusBar } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import UserIcon from 'react-native-vector-icons/FontAwesome'

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

class Bar extends Component {
  render() {
    return (
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
        </Appbar.Header>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  userIcon: {
    marginLeft: widthPercentageToDP('2%'),
    width: widthPercentageToDP('9.5%'),
    height: heightPercentageToDP('5.2%')
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loggedUser: (user) => dispatch(loggedUser(user))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bar);