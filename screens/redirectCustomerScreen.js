import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, TextInput, Alert } from 'react-native'
import Bar from '../components/appbar'
import CheckBox from '@react-native-community/checkbox'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getServices } from '../action/getServicesAction'
import { redirectCustomer } from '../action/redirectCustomerAction'
import { updateText, updateDisableButtom, updateImage } from '../action/updateStateAction'
import RNPickerSelect from 'react-native-picker-select';
import PickerIcon from 'react-native-vector-icons/FontAwesome5'
import { Shadow } from 'react-native-neomorph-shadows';

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


class RedirectCustomer extends Component {

    showAlert() {
        Alert.alert(
            "Ошибка",
            "Необходимо выбрать услугу!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            PickerValueHolder: '',
            comment: "",
            check: false
        };
    }

    servicesPicker() {

        if (this.props.services.services.inner_services) {
            return (
                <View style={styles.pickerStyle}>
                    <Shadow
                        inner
                        style={{
                            shadowOffset: { width: 0, height: 2 },
                            shadowColor: "rgba(0, 0, 0, 0.25)",
                            shadowRadius: 4,
                            width: widthPercentageToDP('70%'),
                            borderRadius: 8,
                            height: heightPercentageToDP('4.5%'),
                            justifyContent: "center",
                            alignSelf: "center"
                        }}
                    >
                        <RNPickerSelect
                            value={this.state.PickerValueHolder}
                            style={{ ...pickerSelectStyles }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <PickerIcon
                                    style={{ paddingTop: heightPercentageToDP('0.7%'), marginRight: widthPercentageToDP('2.5%') }}
                                    name="angle-down"
                                    size={1.5 * heightPercentageToDP("2%")}
                                    color="rgba(188, 182, 185, 0.7)"
                                />
                            }}
                            placeholder={{ label: "Выбрать услугу... ", value: null }}
                            onValueChange={(itemValue, itemIndex) => (console.log(itemValue), this.setState({ PickerValueHolder: itemValue }))}
                            items={
                                this.props.services.services.inner_services.map(item => ({
                                    label: item.name,
                                    value: item.id
                                }))
                            }
                        />
                    </Shadow>
                </View>
            )
        } else {
            return (
                <View style={styles.pickerStyle}>
                    <Shadow
                        inner
                        style={{
                            shadowOffset: { width: 0, height: 2 },
                            shadowColor: "rgba(0, 0, 0, 0.25)",
                            shadowRadius: 4,
                            width: widthPercentageToDP('70%'),
                            borderRadius: 8,
                            height: heightPercentageToDP('4.5%'),
                            justifyContent: "center",
                            alignSelf: "center"
                        }}
                    >
                        <RNPickerSelect
                            value={this.state.pickerValue}
                            style={{ ...pickerSelectStyles }}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <PickerIcon
                                    style={{ paddingTop: heightPercentageToDP('0.7%'), marginRight: widthPercentageToDP('2.5%') }}
                                    name="angle-down"
                                    size={1.5 * heightPercentageToDP("2%")}
                                    color="rgba(188, 182, 185, 0.7)"
                                />
                            }}
                            placeholder={{}}
                            onValueChange={(value) => (console.log(value), this.setState({ pickerValue: value }))}
                            items={[
                                { label: "Выбрать услугу... ", value: null }
                            ]}
                        />
                    </Shadow>
                </View>
            )
        }
    }

    redirectClient() {
        return (
            {
                "service_id": this.state.PickerValueHolder,
                "user_id": this.props.user.user.id,
                "comments": this.state.comment,
                "result_id": 1,
                "request_back": this.state.check
            }
        )

    }


    componentDidMount() {
        this.props.getServices()

    }

    checkPicker() {
        if (this.state.PickerValueHolder) {
            this.props.redirectCustomer(this.redirectClient()),
                this.props.navigation.navigate('CallClient'),
                this.props.updateDisableButtom(false, false, true, true, true, true, true, false),
                this.props.updateText(0),
                this.props.updateImage(0)
        } else {
            this.showAlert()
        }
    }


    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <Bar />
                <Text style={styles.redirectText}>Перенаправление клиента</Text>
                <View>
                    {this.servicesPicker()}
                </View>

                <View style={styles.inputStyle}>
                    <Shadow
                        inner
                        style={{
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 1,
                            shadowColor: "rgba(0, 0, 0, 0.25)",
                            shadowRadius: 4,
                            width: widthPercentageToDP('70%'),
                            borderRadius: 12,
                            height: heightPercentageToDP('15%'),
                            alignSelf: "center"
                        }}
                    >
                        <TextInput
                            style={styles.inputText}
                            value={this.state.comment}
                            onChangeText={value => this.setState({ comment: value })}
                            placeholder="Коментарий..."
                            placeholderTextColor="#AFAFAF"
                            maxLength={150}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </Shadow>
                </View>

                <View style={styles.checkBoxStyle}>
                    <Shadow
                        inner
                        style={{
                            shadowOffset: { width: 0, height: 2 },
                            shadowColor: "rgba(0, 0, 0, 0.25)",
                            shadowRadius: 4,
                            width: widthPercentageToDP('70%'),
                            borderRadius: 8,
                            height: heightPercentageToDP('4.5%'),
                            justifyContent: "center",
                            alignSelf: "center"
                        }}
                    >
                        <CheckBox
                            value={this.state.check}
                            style={styles.checkBox}
                            onValueChange={(newValue => this.setState({ check: newValue }))}
                        />
                    </Shadow>
                </View>
                <View >
                    <Text style={styles.returnText} >С возвращением клиента</Text>
                </View >

                <View>

                    <View>
                        <Button
                            raised={true}
                            title="Выполнить перенаправление"
                            buttonStyle={{
                                backgroundColor: "#41D38D",
                                borderRadius: 8,
                                width: widthPercentageToDP('70%'),
                                height: heightPercentageToDP('4.5%')
                            }}

                            containerStyle={{

                                alignSelf: "center",
                                marginTop: heightPercentageToDP('4%'),
                                marginBottom: heightPercentageToDP('2%'),
                            }}

                            titleStyle={{
                                fontSize: heightPercentageToDP('1.8%'),
                                color: "#FFFFFF",
                                textAlign: "center",
                                alignItems: "center",
                                fontWeight: "500",
                                fontStyle: "normal",
                                fontFamily: "Roboto"
                            }}
                            onPress={() => {
                                this.checkPicker()
                            }}
                        />
                    </View>

                    <Button
                        raised={true}
                        title="Отмена"
                        buttonStyle={{
                            backgroundColor: "rgba(255, 215, 112, 0.9)",
                            borderRadius: 8,
                            width: widthPercentageToDP('70%'),
                            height: heightPercentageToDP('4.5%')
                        }}

                        containerStyle={{
                            alignSelf: "center",
                            marginBottom: heightPercentageToDP('2%'),
                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('1.8%'),
                            color: "#FFFFFF",
                            textAlign: "center",
                            alignItems: "center",
                            fontWeight: "500",
                            fontStyle: "normal",
                            fontFamily: "Roboto"
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('CallClient')
                        }}
                    />
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    redirectText: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('13%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#A1A0A0",
        marginBottom: heightPercentageToDP('4%')
    },
    pickerStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "rgba(233, 233, 233, 1)",
        borderRadius: 8,
        height: heightPercentageToDP('4.5%'),
        justifyContent: "center",
        alignSelf: "center",
        paddingRight: heightPercentageToDP('1.7%'),
        marginBottom: heightPercentageToDP('2%')
    },

    pickerText: {
        color: "#AFAFAF"
    },

    inputText: {
        textAlign: 'left',
        paddingStart: widthPercentageToDP('2.5%'),
        color: "#AFAFAF",
        fontSize: heightPercentageToDP('2%')


    },
    inputStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#E9E9E9",
        borderRadius: 12,
        height: heightPercentageToDP('15%'),
        alignSelf: "center",

    },
    returnText: {
        marginLeft: widthPercentageToDP('17.5%'),
        marginTop: heightPercentageToDP('-3.5%'),
        fontSize: heightPercentageToDP('2%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#AFAFAF",
    },
    checkBox: {
        alignSelf: "flex-end",
        marginRight: widthPercentageToDP('1.7%')
    },
    checkBoxStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#E9E9E9",
        borderRadius: 8,
        height: heightPercentageToDP('4.5%'),
        justifyContent: "center",
        marginTop: heightPercentageToDP('2%'),
        alignSelf: "center",
    }

})

const pickerSelectStyles = StyleSheet.create({

    inputAndroid: {
      fontSize: heightPercentageToDP('2.1%'),
      textAlign: "center",
      paddingVertical: heightPercentageToDP('1%'),
      color: "#AFAFAF"
    },
    placeholder: {
        color: "#AFAFAF"
      }
  })

const mapStateToProps = state => {
    return {
        user: state.user,
        customer: state.customer,
        services: state.services,
        disableButtonCallClient: state.disableButtonCallClient,
        disableButtonInvitePostponeCustomer: state.disableButtonInvitePostponeCustomer,
        disableButtonClientNotEnter: state.disableButtonClientNotEnter,
        disableButtonStartClient: state.disableButtonStartClient,
        disableButtonRedirectClient: state.disableButtonRedirectClient,
        disableButtonPostponeClient: state.disableButtonPostponeClient,
        disableFinishClient: state.disableFinishClient,
        disableButtonExit: state.disableButtonExit,
        text: state.text,
        image: state.image
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getServices: () => dispatch(getServices()),
        redirectCustomer: (data) => dispatch(redirectCustomer(data)),
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
        ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectCustomer);