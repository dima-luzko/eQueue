import React, { Component } from 'react'
import { StyleSheet, PixelRatio, Dimensions, StatusBar, Alert, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { selectIpAddress } from '../action/updateStateAction'
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

class SplashScreen extends Component {

    errorNetworkAlert() {
        Alert.alert(
            "Нет интернет-соединения",
            "Данные не могут быть загружены." + "\n" + "Отсутствует интернет-соединение.",
            [
                { text: "Попробуйте снова" }
            ],
            { cancelable: false }
        );
    }

    componentDidMount = async () => {
        let ipStatus = await AsyncStorage.getItem('ip')

        setTimeout(() => {
            this.props.selectIpAddress(ipStatus)
            this.props.navigation.navigate(ipStatus ? 'LoginScreen' : 'ConnectingToIP')
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
        ipAddress: state.ipAddress
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress)),
        selectIpAddress: (ipAddress) => dispatch(selectIpAddress(ipAddress))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen); 