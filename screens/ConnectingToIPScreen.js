import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, PixelRatio, Text, TextInput, Alert, StatusBar } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { checkServerState } from '../action/serverStateAction'
import { selectIpAddress } from '../action/updateStateAction'
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


class ConnectingToIP extends Component {

    errorInputIPAlert() {
        Alert.alert(
            "Ошибка",
            "Сначала необходимо ввести ip - адресс сервера!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true
        };
    }

    checkServer() {
        setTimeout(() => {
            this.props.checkServerState(this.props.ipAddress.ipAddress)
            if (this.props.ipAddress.ipAddress) {

                console.log("Введенный ip-адрес: " + this.props.ipAddress.ipAddress);
                setTimeout(() => {
                    if (this.props.server.server) {
                        AsyncStorage.setItem('ip', this.props.ipAddress.ipAddress)
                        this.props.navigation.navigate("ServerNoConnection")
                        console.log("Соединение с сервером установлено!");
                    }

                    else {
                        this.props.navigation.navigate("ServerConnection")
                        console.error("Нет соединения с сервером!");
                    }
                }, 100);
            }
            else {
                this.errorInputIPAlert()
            }
        }, 300);
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
                <View>
                    <Dialog
                        visible={this.state.dialogVisible}
                    >
                        <DialogContent
                            style={styles.dialogStyle}
                        >
                            <View>
                                <Text style={styles.text}>Введите ip - aдресс сервера</Text>
                                <View style={styles.inputStyle}>
                                    <TextInput
                                        value={this.props.ipAddress.ipAddress}
                                        onChangeText={value => this.props.selectIpAddress(value)}
                                        placeholder="Введите ip - адресс для подключения к серверу"
                                        maxLength={15}
                                        numberOfLines={1}
                                        keyboardType='numeric'

                                    />
                                </View>
                                <View >
                                    <Button
                                        title="Проверить соединение"
                                        buttonStyle={{
                                            backgroundColor: '#F4F1F1',
                                            width: widthPercentageToDP('80%'),
                                            alignSelf: 'center',
                                            borderRadius: 4,
                                            marginTop: heightPercentageToDP('3%'),
                                            //shadowColor: "rgba(0, 0, 0, 0.25)",
                                            // shadowOffset: {
                                            //     width: 0,
                                            //     height: 2,
                                            // },
                                            // shadowOpacity: 0.25,
                                            // shadowRadius: 4,
                                            // elevation: 5,
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('2%'),
                                            color: '#A1A0A0',
                                            fontWeight: "bold",
                                            fontFamily: "Roboto",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            this.setState({dialogVisible: false})
                                            this.checkServer()
                                        }}
                                    />
                                </View>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
            </LinearGradient>

        )
    }
}


const styles = StyleSheet.create({

    dialogStyle: {
        width: widthPercentageToDP('90%'),
        height: heightPercentageToDP('25%')
    },

    inputStyle: {
        width: widthPercentageToDP('80%'),
        backgroundColor: "rgba(244, 244, 244, 0.9)",
        borderRadius: 4,
        height: heightPercentageToDP('6%'),
        alignSelf: 'center',


    },
    text: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.3%'),
        color: "#A1A0A0",
        fontWeight: "500",
        marginTop: heightPercentageToDP('2%'),
        marginBottom: heightPercentageToDP('3%')
    },

    textConnection: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: heightPercentageToDP('2.3%'),
        color: '#A1A0A0',
        marginTop: heightPercentageToDP('7%'),
        marginBottom: heightPercentageToDP('4%')
    },
    textNotConnection: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: heightPercentageToDP('2.3%'),
        color: '#A1A0A0',
        marginTop: heightPercentageToDP('7%'),
        marginBottom: heightPercentageToDP('4%')
    },

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
export default connect(mapStateToProps, mapDispatchToProps)(ConnectingToIP); 
