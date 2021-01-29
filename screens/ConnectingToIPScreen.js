import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, PixelRatio, Text, TextInput, Alert } from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { checkServerState } from '../action/serverStateAction'
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


class ConnectingToIP extends Component {

    errorInputIPAlert() {
        Alert.alert(
            "Ошибка",
            "Сначала необходимо ввести ip-адрес!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }


    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true,
            text: 0,
            buttom: 0
        };
    }



    changeText() {
        switch (this.state.text) {
            case 0:
                return (
                    null
                )
            case 1:
                return (
                    <Text style={styles.textConnection}>Соединение с сервером установлено!</Text>
                )
            case 2:
                return (
                    <Text style={styles.textNotConnection}>Нет соединения с сервером!</Text>
                )
        }
    }

    checkServer() {
        setTimeout(() => {
            this.props.checkServerState(this.props.ipAddress.ipAddress)
            if (this.props.ipAddress.ipAddress) {
               
                console.log("Введенный ip-адрес: " + this.props.ipAddress.ipAddress);
                setTimeout(() => {
                    if (this.props.server.server) {
                        AsyncStorage.setItem('ip', this.props.ipAddress.ipAddress)
                        this.setState({ text: 1, buttom: 2 })                        
                        console.log("Соединение с сервером установлено!");
                    }

                    else {
                        this.setState({ text: 2, buttom: 1 })
                        console.error("Нет соединения с сервером!");
                    }
                }, 100);
            }
            else {
                this.errorInputIPAlert()
            }
        }, 300);
    }

    changeButtom() {
        switch (this.state.buttom) {
            case 0:
                return (
                    <Button
                        title="Проверить соединение"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('50%'),
                            alignSelf: 'center',
                            marginTop: heightPercentageToDP('2%')

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('3%')
                        }}
                        onPress={() => {
                            this.checkServer()
                        }}
                    />
                )
            case 1:
                return (
                    <Button
                        title="Попробовать снова"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('50%'),
                            alignSelf: 'center',
                            marginTop: heightPercentageToDP('2%')

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('3%')
                        }}
                        onPress={() => {
                            this.setState({ text: 0, buttom: 0 }),
                                this.props.selectIpAddress("")
                        }}
                    />
                )
            case 2:
                return (
                    <Button
                        title="ОK"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('50%'),
                            alignSelf: 'center',
                            marginTop: heightPercentageToDP('2%')

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('3%')
                        }}
                        onPress={() => {
                            this.setState({ text: 0 }),
                                this.props.navigation.navigate('LoginScreen'),
                                this.setState({ dialogVisible: false })
                        }}
                    />
                )
        }
    }

    render() {

        return (
            <View>
                <Dialog
                    titleStyle={styles.dialog}
                    visible={this.state.dialogVisible}
                    title="Введите ip-адрес сервера"
                >
                    <View>
                        <Text style={styles.text}>Введите ip-адрес для подключения к серверу:</Text>
                        <View style={styles.inputStyle}>
                            <TextInput
                                value={this.props.ipAddress.ipAddress}
                                onChangeText={value => this.props.selectIpAddress(value)}
                                placeholder="127.0.0.1"
                                maxLength={15}
                                numberOfLines={1}
                                keyboardType='numeric'
                                
                            />
                        </View>
                        <View style={{ height: heightPercentageToDP('5%') }}>
                            {this.changeText()}
                        </View>

                        <View >
                            {this.changeButtom()}
                        </View>
                    </View>
                </Dialog>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    inputStyle: {
        width: widthPercentageToDP('32%'),
        backgroundColor: "#ff7f50",
        borderRadius: 12,
        height: heightPercentageToDP('6%'),
        marginTop: heightPercentageToDP('2%'),
        alignSelf: 'center'

    },
    text: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('1.8%'),
    },
    dialog: {
        fontSize: heightPercentageToDP('2.5%'),
        alignSelf: 'center'
    },

    textConnection: {
        marginTop: heightPercentageToDP('2%'),
        textAlign: 'center',
        fontSize: heightPercentageToDP('2%'),
        color: 'green'
    },
    textNotConnection: {
        marginTop: heightPercentageToDP('2%'),
        textAlign: 'center',
        fontSize: heightPercentageToDP('2%'),
        color: 'red'
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
