import React, { Component } from 'react'
import { StyleSheet, StatusBar, Alert, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { selectIpAddress, postponedCheck, redirectCheck  } from '../action/updateStateAction'
import { checkServerState } from '../action/serverStateAction'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP, heightPercentageToDP } from '../utils/convertDimenToPercentage'

class SplashScreen extends Component {

    constructor() {
        super();
        this.state = {
          control: true
        };
      }

    componentDidMount = async () => {
        let ipStatus = await AsyncStorage.getItem('ip')
        let redirectCheck = await AsyncStorage.getItem('redirectCheck')
        let postponedCheck = await AsyncStorage.getItem('postponedCheck')

        setTimeout(() => {
            this.props.redirectCheck(redirectCheck == "true")
            this.props.postponedCheck(postponedCheck == "true")
            this.props.selectIpAddress(ipStatus)
            this.props.navigation.navigate(ipStatus ? 'LoginScreen' : 'ConnectingToIP')
            this.check()
        }, 2000);

        
    }
      check() {
           setInterval(() => {
            console.log("Рендер текущего ip: ", this.props.ipAddress.ipAddress);
            this.props.checkServerState(this.props.ipAddress.ipAddress)
            if (this.props.control.control && !this.props.server.server) {
              this.props.navigation.navigate("ErrorConnectToServer")
            }
          }, 2000);
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
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={
                        require('../images/logo_equeue.png')
                    }
                />

                <Image
                    resizeMode="contain"
                    style={styles.logoHorizont}
                    source={
                        require('../images/logo_horizont.png')
                    }
                />
                <Text style={styles.fromText}>from</Text>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({

    logo: {
        marginTop: heightPercentageToDP('43%'),
        position: "absolute",
        alignSelf: "center",
        height: heightPercentageToDP('8%'),
        marginLeft: widthPercentageToDP('10%'),

    },
    logoHorizont: {
        marginTop: heightPercentageToDP('90%'),
        position: "absolute",
        height: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('1%'),
        alignSelf: "center"
    },
    fromText: {
        fontFamily: "Roboto",
        textAlign: 'center',
        fontSize: heightPercentageToDP('3%'),
        fontStyle: "normal",
        color: "#FFFFFF",
        fontWeight: "normal",
        position: "absolute",
        marginTop: heightPercentageToDP('85%'),
        alignSelf: "center"
    }
});

const mapStateToProps = state => {
    return {
        server: state.server,
        ipAddress: state.ipAddress,
        control: state.control
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress)),
        selectIpAddress: (ipAddress) => dispatch(selectIpAddress(ipAddress)),
        redirectCheck: (redirectCheckButton) => dispatch(redirectCheck(redirectCheckButton)),
        postponedCheck: (postponedCheckButton) => dispatch(postponedCheck(postponedCheckButton))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen); 