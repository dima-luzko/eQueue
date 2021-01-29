import { View } from 'native-base';
import React, { Component } from 'react'
import { Appbar } from 'react-native-paper'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {loggedUser} from '../action/loggedUserAction'
import {PixelRatio, Dimensions} from 'react-native'



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
    render(){
        return(
            <View>
                 <Appbar.Header
          style={{
            backgroundColor: '#003f5c',
            height: heightPercentageToDP('8%')
          }}
        >
          <Icon
            name="user"
            size={3*widthPercentageToDP("2.5%")}
            color="white"
            style={{
              marginLeft: widthPercentageToDP("2%")
            }} />
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
        </Appbar.Header>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        loggedUser: (user) => dispatch(loggedUser(user))
  
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Bar);