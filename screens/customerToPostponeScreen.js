import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, TextInput, Alert } from 'react-native'
import Bar from '../components/appbar'
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { postponeCustomer } from '../action/posponeCustomerAction';
import { updateText, updateDisableButtom, updateImage } from '../action/updateStateAction'

const widthPercentageToDP = widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100)}
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


let error = false
let minutes = 0

class CustomerToPostpone extends Component {

    showAlert() {
        Alert.alert(
            "Ошибка",
            "Проверьте введенное время",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    showAlert1() {
        Alert.alert(
            "Ошибка",
            "Необходимо сначала ввести время!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            check: false,
            postponePeriod: 0
        };
    }



    postpone() {
        if (parseInt(this.minsforHours) || parseInt(this.mins)) {

            if (this.minsforHours || this.hours) {

                if (Number.parseInt(this.minsforHours) < 0 || Number.parseInt(this.minsforHours) > 59) {
                    error = true
                }
                else if (Number.parseInt(this.hours) < 0 || Number.parseInt(this.hours) > 23) {
                    error = true
                } else {
                    error = false
                }

                minutes = (Number.parseInt(this.hours * 60) + Number.parseInt(this.minsforHours)) - (Number.parseInt((new Date().getHours() * 60)) + Number.parseInt((new Date().getMinutes())))
                console.log("time === ", minutes)
            }
            else {
                minutes = this.mins
            }

            if (minutes <= 0 || minutes > 480) {
                error = true
            }

            if (error) {
                this.showAlert()
            }

            else {
                this.data()
            }

        }
        else {
            this.showAlert1()
        }

    }

    data() {
        let data = {
            "user_id": this.props.user.user.id,
            "comments": this.state.comment,
            "is_only_mine": this.state.check,
            "postponed_period": minutes
        }
        this.props.postponeCustomer(data),
            this.props.navigation.navigate('CallClient'),
            this.props.updateText(0),
            this.props.updateImage(0),
            this.props.updateDisableButtom(false,false,true,true,true,true,true,false)
    }

    render() {


        return (
            <View>
                <Bar />

                <Text style={styles.postponeText}>Отложить клиента</Text>

                <View style={styles.minutesStyle}>
                    <Text style={styles.minutesText}>мин.</Text>
                </View>

                <View style={styles.numberOfMinutesStyle}>
                    <TextInput
                        onChangeText={value => this.mins = value}
                        style={styles.minutes}
                        maxLength={2}
                        keyboardType='numeric'
                    />

                </View>

                <View style={styles.minutesInputStyle}>

                    <Text style={{ textAlign: 'left', marginLeft: widthPercentageToDP('1.5%'), fontSize: heightPercentageToDP('2.3%') }} >Отложить на:</Text>
                </View>

                <Text style={styles.orText}>Или</Text>

                <View>

                    <View style={styles.hoursStyle}>
                        <Text style={styles.minutesText}>ч.</Text>
                    </View>

                    <View style={styles.nextMinutesStyle}>
                        <Text style={styles.minutesText}>мин.</Text>
                    </View>

                    <View style={styles.inputHoursStyle}>
                        <TextInput
                            onChangeText={value => this.hours = value}
                            style={styles.minutes}
                            maxLength={2}
                            keyboardType='numeric'
                            placeholder={new Date().getHours() + ""}
                        />
                    </View>

                    <View style={styles.inputNextMinuteStyle}>
                        <TextInput
                            onChangeText={value => this.minsforHours = value}
                            placeholder={new Date().getMinutes() + ""}
                            style={styles.minutes}
                            maxLength={2}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.postponeInputStyle}>
                        <Text style={{ textAlign: 'left', marginLeft: widthPercentageToDP('1.5%'), fontSize: heightPercentageToDP('2.3%') }} >Отложить до:</Text>
                    </View>
                </View>

                <View style={styles.inputStyle}>
                    <TextInput
                        style={styles.inputText}
                        value={this.state.comment}
                        onChangeText={value => this.setState({ comment: value })}
                        placeholder="Коментарий..."
                        placeholderTextColor="#006400"
                        maxLength={200}
                        numberOfLines={4}
                        multiline={true}
                    />
                </View>

                <View style={styles.checkBoxStyle}>
                    <CheckBox
                        value={this.state.check}
                        style={styles.checkBox}
                        onValueChange={(newValue => this.setState({ check: newValue }))}
                    />
                    <View style={styles.onlyForMeText}>
                        <Text >Только для меня</Text>
                    </View >
                </View>

                <View>
                    <Button
                        title="Отмена"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('25%'),
                            marginLeft: widthPercentageToDP('17%'),

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('3%')
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('CallClient')
                        }}
                    />
                </View>

                <View>
                    <Button
                        title="Отложить клиента"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('40%'),
                            marginLeft: widthPercentageToDP('46.5%'),
                            marginTop: heightPercentageToDP('-5.5%'),

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white'
                        }}
                        onPress={() => {
                            this.postpone()
                        }}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    orText: {
        textAlign: 'center',
        marginLeft: widthPercentageToDP('1.5%'),
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('1%'),

    },

    postponeText: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('16%'),
        marginBottom: heightPercentageToDP('2%'),
    },

    minutesText: {
        textAlign: 'right',
        fontSize: heightPercentageToDP('2.3%'),
        marginRight: widthPercentageToDP('1.5%'),
        paddingTop: heightPercentageToDP('1%'),

    },

    minutesStyle: {
        width: widthPercentageToDP('13%'),
        backgroundColor: "#ff7f50",
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        height: heightPercentageToDP('5%'),
        marginLeft: widthPercentageToDP('74%'),
        marginBottom: heightPercentageToDP('-7%')
    },

    nextMinutesStyle: {
        width: widthPercentageToDP('13%'),
        backgroundColor: "#ff7f50",
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        height: heightPercentageToDP('5%'),
        marginLeft: widthPercentageToDP('74%'),
        marginBottom: heightPercentageToDP('-2%'),
        marginTop: heightPercentageToDP('-5%')
    },



    postponeInputStyle: {
        width: widthPercentageToDP('30%'),
        backgroundColor: "#ff7f50",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        height: heightPercentageToDP('5%'),
        marginLeft: widthPercentageToDP('17%'),
        marginTop: heightPercentageToDP('-10%'),
        justifyContent: "center",
    },

    inputText: {
        width: "80%",
        height: 100,
        borderRadius: 12,
        textAlign: 'left',
        paddingStart: 10,
        color: "white",


    },
    inputStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#ff7f50",
        borderRadius: 12,
        height: heightPercentageToDP('15%'),
        marginTop: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('17%'),


    },

    minutes: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.3%'),
        paddingTop: heightPercentageToDP('0.7%'),
        paddingBottom: heightPercentageToDP('0.5%'),
        color: "white"

    },

    numberOfMinutesStyle: {
        width: widthPercentageToDP('27.5%'),
        backgroundColor: "#ff7f50",
        marginLeft: widthPercentageToDP('47%'),
        height: heightPercentageToDP('5%'),
        marginTop: heightPercentageToDP('2%'),
        borderWidth: 1.5,
    },

    inputHoursStyle: {
        width: widthPercentageToDP('10%'),
        backgroundColor: "#ff7f50",
        marginLeft: widthPercentageToDP('47%'),
        height: heightPercentageToDP('5%'),
        marginTop: heightPercentageToDP('-3%'),
        marginBottom: heightPercentageToDP('5%'),
        borderWidth: 1.5,
    },

    inputNextMinuteStyle: {
        width: widthPercentageToDP('10%'),
        backgroundColor: "#ff7f50",
        marginLeft: widthPercentageToDP('64%'),
        height: heightPercentageToDP('5%'),
        marginTop: heightPercentageToDP('-10%'),
        marginBottom: heightPercentageToDP('5%'),
        borderWidth: 1.5,
    },

    hoursStyle: {
        width: widthPercentageToDP('7.2%'),
        backgroundColor: "#ff7f50",
        height: heightPercentageToDP('5%'),
        marginLeft: widthPercentageToDP('57%'),
        marginTop: heightPercentageToDP('1%')
    },

    minutesInputStyle: {
        width: widthPercentageToDP('30%'),
        backgroundColor: "#ff7f50",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        height: heightPercentageToDP('5%'),
        marginLeft: widthPercentageToDP('17%'),
        marginTop: heightPercentageToDP('-5%'),
        justifyContent: "center",

    },



    onlyForMeText: {
        marginLeft: widthPercentageToDP('15%'),
        marginTop: heightPercentageToDP('-4.3%'),
    },
    checkBox: {
        marginTop: heightPercentageToDP('-1%'),
        marginLeft: widthPercentageToDP('5%'),
    },
    checkBoxStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#ff7f50",
        borderRadius: 12,
        height: heightPercentageToDP('5%'),
        justifyContent: "center",
        marginTop: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('17%'),
        marginBottom: "4%"
    }

})

const mapStateToProps = state => {
    return {
        user: state.user,
        customer: state.customer,
        text: state.text,
        image: state.image,
        disableButtonCallClient: state.disableButtonCallClient,
        disableButtonInvitePostponeCustomer: state.disableButtonInvitePostponeCustomer,
        disableButtonClientNotEnter: state.disableButtonClientNotEnter,
        disableButtonStartClient: state.disableButtonStartClient,
        disableButtonRedirectClient: state.disableButtonRedirectClient,
        disableButtonPostponeClient: state.disableButtonPostponeClient,
        disableFinishClient: state.disableFinishClient,
        disableButtonExit: state.disableButtonExit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postponeCustomer: (data) => dispatch(postponeCustomer(data)),
        updateText: (text) => dispatch(updateText(text)),
        updateImage: (image) => dispatch(updateImage(image)),
        updateDisableButtom: (
            disableButtonCallClient,
            disableButtonInvitePostponeCustomer,
            disableButtonClientNotEnter,
            disableButtonStartClient,
            disableButtonRedirectClient,
            disableButtonPostponeClient,
            disableFinishClient,
            disableButtonExit
        ) => dispatch(updateDisableButtom(
            disableButtonCallClient,
            disableButtonInvitePostponeCustomer,
            disableButtonClientNotEnter,
            disableButtonStartClient,
            disableButtonRedirectClient,
            disableButtonPostponeClient,
            disableFinishClient,
            disableButtonExit
        )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerToPostpone);