import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import { PixelRatio, Dimensions, StyleSheet, StatusBar } from 'react-native'
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

export default class SettingsBar extends Component {
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
         
          <Appbar.Content
            titleStyle={{
              fontSize: heightPercentageToDP('3%'),
              textAlign: "center",
              color: "#FFFFFF",
              fontFamily: "Roboto",
              fontWeight: '600'
            }}
            title={"Настройки"}
          />
        </Appbar.Header>
      </LinearGradient>
    )
  }
}


