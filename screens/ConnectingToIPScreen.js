import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, StatusBar } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { checkServerState, setServerState } from '../action/serverStateAction'
import { selectIpAddress, changeText1, changeText2, changeText3, changeText4, changeText5 } from '../action/updateStateAction'
import LinearGradient from 'react-native-linear-gradient'
import { Shadow } from 'react-native-neomorph-shadows';
import { Col, Grid } from "react-native-easy-grid";
import { widthPercentageToDP, heightPercentageToDP } from '../utils/convertDimenToPercentage'

class ConnectingToIP extends Component {

    errorInputIPAlert() {
        Alert.alert(
            "Ошибка",
            "Сначала необходимо ввести ip - адресс сервера!",
            [
                { text: "OK", onPress: () => this.setState({ dialogVisible: true }) }
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
        var glueIpAdress = "http://" + this.props.text_1.text_1 + "." + this.props.text_2.text_2 + "." + this.props.text_3.text_3 + "." + this.props.text_4.text_4 + ":" + this.props.text_5.text_5 

        this.props.selectIpAddress(glueIpAdress)

        this.props.setServerState()

        setTimeout(() => {
            this.props.checkServerState(this.props.ipAddress.ipAddress)

            setTimeout(() => {
                console.log("Введенный ip-адрес: " + this.props.ipAddress.ipAddress);
            }, 300);
            setTimeout(() => {
                if (this.props.server.server) {
                    AsyncStorage.setItem('ip', this.props.ipAddress.ipAddress)
                    this.props.navigation.navigate("ServerConnection")
                    console.log("Соединение с сервером установлено!");
                }

                else {
                    this.props.navigation.navigate("ServerNoConnection")
                    console.error("Нет соединения с сервером!")
                }
            }, 800);

        }, 500);
    }

    handleChange(input) {
        if (input.value < 0) input.value = 0;
        if (input.value > 254) input.value = 254;
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
                        visible={this.state.dialogVisible}
                    >
                        <DialogContent
                            style={styles.dialogStyle}
                        >
                            <View>
                                <Text style={styles.text}>Введите ip - aдресс сервера</Text>
                                <View style={styles.inputStyle}>
                                    <Grid>
                                        <Col style={{ width: widthPercentageToDP('10%'), marginLeft: widthPercentageToDP('10%'), backgroundColor: "rgba(244, 244, 244, 0.9)" }}>
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 2,
                                                    width: widthPercentageToDP('10%'),
                                                    borderRadius: 4,
                                                    height: heightPercentageToDP('6%'),
                                                    justifyContent: "center",
                                                    alignSelf: "center"
                                                }}
                                            >
                                                <TextInput
                                                    style={{ fontSize: heightPercentageToDP('1.75%'), textAlign: "center"}}
                                                    value={this.props.text_1.text_1}
                                                    onChangeText={value => this.props.changeText1(value > 254 ? "254": value && value < 0 ? "0" : value)}
                                                    placeholder="127"
                                                    maxLength={3}
                                                    numberOfLines={1}
                                                    keyboardType='numeric'
                                                    
                                                />
                                            </Shadow>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('3%') }}>
                                            <Text style={{ color: "#A2A0A0", fontSize: heightPercentageToDP('4.5%'), marginTop: heightPercentageToDP('1%') }}>.</Text>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('10%'), backgroundColor: "rgba(244, 244, 244, 0.9)" }}>
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 2,
                                                    width: widthPercentageToDP('10%'),
                                                    borderRadius: 4,
                                                    height: heightPercentageToDP('6%'),
                                                    justifyContent: "center",
                                                    alignSelf: "center"
                                                }}
                                            >
                                                <TextInput
                                                    style={{ fontSize: heightPercentageToDP('1.75%'), textAlign: "center"}}
                                                    value={this.props.text_2.text_2}
                                                    onChangeText={value => this.props.changeText2(value > 254 ? "254": value && value < 0 ? "0" : value)}
                                                    placeholder="0"
                                                    maxLength={3}
                                                    numberOfLines={1}
                                                    keyboardType='numeric'
                                                />
                                            </Shadow>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('3%') }}>
                                            <Text style={{ color: "#A2A0A0", fontSize: heightPercentageToDP('4.5%'), marginTop: heightPercentageToDP('1%') }}>.</Text>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('10%'), backgroundColor: "rgba(244, 244, 244, 0.9)" }}>
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 2,
                                                    width: widthPercentageToDP('10%'),
                                                    borderRadius: 4,
                                                    height: heightPercentageToDP('6%'),
                                                    justifyContent: "center",
                                                    alignSelf: "center"
                                                }}
                                            >
                                                <TextInput
                                                    style={{ fontSize: heightPercentageToDP('1.75%'), textAlign: "center"}}
                                                    value={this.props.text_3.text_3}
                                                    onChangeText={value => this.props.changeText3(value > 254 ? "254": value && value < 0 ? "0" : value)}
                                                    placeholder="0"
                                                    maxLength={3}
                                                    numberOfLines={1}
                                                    keyboardType='numeric'
                                                />
                                            </Shadow>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('3%') }}>
                                            <Text style={{ color: "#A2A0A0", fontSize: heightPercentageToDP('4.5%'), marginTop: heightPercentageToDP('1%') }}>.</Text>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('10%'), backgroundColor: "rgba(244, 244, 244, 0.9)" }}>
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 2,
                                                    width: widthPercentageToDP('10%'),
                                                    borderRadius: 4,
                                                    height: heightPercentageToDP('6%'),
                                                    justifyContent: "center",
                                                    alignSelf: "center"
                                                }}
                                            >
                                                <TextInput
                                                    style={{ fontSize: heightPercentageToDP('1.75%'), textAlign: "center"}}
                                                    value={this.props.text_4.text_4}
                                                    onChangeText={value => this.props.changeText4(value > 254 ? "254": value && value < 0 ? "0" : value)}
                                                    placeholder="1"
                                                    maxLength={3}
                                                    numberOfLines={1}
                                                    keyboardType='numeric'
                                                />
                                            </Shadow>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('3%') }}>
                                            <Text style={{ color: "#A2A0A0", fontSize: heightPercentageToDP('4.5%'), marginTop: heightPercentageToDP('-1%') }}>:</Text>
                                        </Col>
                                        <Col style={{ width: widthPercentageToDP('12%'), backgroundColor: "rgba(244, 244, 244, 0.9)" }}>
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 2, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 2,
                                                    width: widthPercentageToDP('12%'),
                                                    borderRadius: 4,
                                                    height: heightPercentageToDP('6%'),
                                                    justifyContent: "center",
                                                    alignSelf: "center"
                                                }}
                                            >
                                                <TextInput
                                                    style={{ fontSize: heightPercentageToDP('1.75%'), textAlign: "center" }}
                                                    value={this.props.text_5.text_5}
                                                    onChangeText={value => this.props.changeText5(value)}
                                                    placeholder="1"
                                                    maxLength={5}
                                                    numberOfLines={1}
                                                    keyboardType='numeric'
                                                />
                                            </Shadow>
                                        </Col>
                                    </Grid>

                                </View>
                                <View >

                                    <Button
                                        raised={true}
                                        title="Проверить соединение"
                                        buttonStyle={{
                                            backgroundColor: '#F4F1F1',
                                            width: widthPercentageToDP('80%'),
                                            height: heightPercentageToDP('4.5%'),
                                            borderRadius: 4
                                        }}

                                        containerStyle={{
                                            marginTop: heightPercentageToDP('3%'),
                                            alignSelf: "center"
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('2%'),
                                            color: '#A1A0A0',
                                            fontWeight: "bold",
                                            fontFamily: "Roboto",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            this.setState({ dialogVisible: false })
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
        width: widthPercentageToDP('10%'),
        borderRadius: 4,
        height: heightPercentageToDP('6%'),
    },
    text: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.5%'),
        color: "#A1A0A0",
        fontWeight: "500",
        marginTop: heightPercentageToDP('2%'),
        marginBottom: heightPercentageToDP('3%')
    }
});

const mapStateToProps = state => {
    return {
        server: state.server,
        ipAddress: state.ipAddress,
        text_1: state.text_1,
        text_2: state.text_2,
        text_3: state.text_3,
        text_4: state.text_4,
        text_5: state.text_5
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress)),
        setServerState: () => dispatch(setServerState()),
        selectIpAddress: (ipAddress) => dispatch(selectIpAddress(ipAddress)),
        changeText1: (text_1) => dispatch(changeText1(text_1)),
        changeText2: (text_2) => dispatch(changeText2(text_2)),
        changeText3: (text_3) => dispatch(changeText3(text_3)),
        changeText4: (text_4) => dispatch(changeText4(text_4)),
        changeText5: (text_5) => dispatch(changeText5(text_5)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectingToIP); 
