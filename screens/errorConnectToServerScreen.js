import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, PixelRatio, Text, StatusBar } from 'react-native'
import Dialog, { DialogContent} from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { checkServerState } from '../action/serverStateAction'
import LinearGradient from 'react-native-linear-gradient'
import { Col, Grid } from "react-native-easy-grid";
import { passwordState, userState, showPassword} from '../action/updateStateAction'
import { Shadow } from 'react-native-neomorph-shadows';
import { UIActivityIndicator } from 'react-native-indicators';

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

class ErrorConnectToServer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visiable: true,
            text: 0,
            buttom: 0
        };
    }

    componentDidMount() {
        this.checkServer()
    }


    changeText() {
        switch (this.state.text) {
            case 0:
                return (
                    <Text style={styles.textNotConnection}>Проблемы с подключением к серверу!</Text>
                )
            case 1:
                return (
                    <Text style={styles.textConnection}>Соединение с сервером установлено!</Text>
                )
            case 2:
                return (
                    <Text style={styles.textConnection}>Проверка соединения с сервером...</Text>
                )
        }
    }

    checkServer() {
        this.setState({ text: 2, buttom: 2 })
        setTimeout(() => {
            setInterval(() => {
                this.props.checkServerState(this.props.ipAddress.ipAddress)
                setTimeout(() => {
                    if (this.props.server.server) {
                        this.setState({ text: 1, buttom: 1 })
                    }
                    else {
                        this.setState({ text: 0, buttom: 0 })
                    }
                }, 1200);
            }, 2000);
        }, 600);
    }

    changeButtom() {
        switch (this.state.buttom) {
            case 0:
                return (
                    <View>
                        <Grid>
                            <Col style={{ height: heightPercentageToDP('10%') }}>
                                <Shadow
                                    style={{
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowColor: "rgba(253, 174, 190, 0.7)",
                                        shadowRadius: 4,
                                        width: widthPercentageToDP('38%'),
                                        borderRadius: 4,
                                        height: heightPercentageToDP('5%'),
                                        backgroundColor: "rgba(253, 174, 190, 0.7)",

                                    }}
                                >
                                    <Button
                                        title="Попробовать снова"
                                        buttonStyle={{
                                            backgroundColor: 'rgba(253, 174, 190, 0.7)',
                                            borderRadius: 4,
                                            width: widthPercentageToDP('38%'),
                                            height: heightPercentageToDP('5%')
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('1.67%'),
                                            color: '#FFFFFF',
                                            fontWeight: "bold",
                                            fontFamily: "Roboto",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            this.checkServer()
                                        }}
                                    />
                                </Shadow>
                            </Col>
                            <Col style={{ height: heightPercentageToDP('10%') }}>
                                <Shadow
                                    style={{
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowColor: "rgba(253, 174, 190, 0.7)",
                                        shadowRadius: 4,
                                        width: widthPercentageToDP('40%'),
                                        borderRadius: 4,
                                        height: heightPercentageToDP('5%'),
                                        backgroundColor: "rgba(253, 174, 190, 0.7)"
                                    }}
                                >
                                    <Button
                                        title="Ввести новый ip-адресс"
                                        buttonStyle={{
                                            backgroundColor: 'rgba(253, 174, 190, 0.7)',
                                            borderRadius: 4,
                                            width: widthPercentageToDP('40%'),
                                            height: heightPercentageToDP('5%'),
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('1.67%'),
                                            color: '#FFFFFF',
                                            fontWeight: "bold",
                                            fontFamily: "Roboto",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            this.props.navigation.replace("ConnectingToIP")
                                        }}
                                    />
                                </Shadow>
                            </Col>
                        </Grid>

                    </View>

                )
            case 1:
                return (
                    <Shadow
                        style={{
                            shadowOffset: { width: 0, height: 2 },
                            shadowColor: "rgba(65, 211, 141, 0.7)",
                            shadowRadius: 4,
                            width: widthPercentageToDP('38%'),
                            borderRadius: 4,
                            height: heightPercentageToDP('5%'),
                            backgroundColor: "#41D38D",
                            marginLeft: widthPercentageToDP('22%')
                        }}
                    >
                        <Button
                            title="ОK"
                            buttonStyle={{
                                backgroundColor: '#41D38D',
                                borderRadius: 4,
                                width: widthPercentageToDP('38%')
                            }}

                            containerStyle={{
                                alignSelf: "center"
                            }}

                            titleStyle={{
                                fontSize: heightPercentageToDP('2%'),
                                color: '#FFFFFF',
                                fontWeight: "bold",
                                fontFamily: "Roboto",
                                alignItems: "center"
                            }}
                            onPress={() => {
                                this.props.navigation.replace("LoginScreen"),
                                    this.props.userState(""),
                                    this.props.passwordState(""),
                                    this.props.showPassword(true)
                                this.setState({ visiable: false })
                            }}
                        />
                    </Shadow>
                )
            case 2:
                return (
                    <UIActivityIndicator color="#A1A0A0" size={2 * heightPercentageToDP('2%')} />
                )
        }
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
                <View style={{ backgroundColor: "#FFFFFF" }}>
                    <Dialog
                        visible={this.state.visiable}
                    >
                        <DialogContent
                            style={styles.dialogStyle}
                        >
                            <View>
                                {this.changeText()}
                            </View>
                            <View >
                                {this.changeButtom()}
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
        passwordState: (password) => dispatch(passwordState(password)),
        userState: (userSelected) => dispatch(userState(userSelected)),
        showPassword: (secureTextEntry) => dispatch(showPassword(secureTextEntry)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorConnectToServer); 
