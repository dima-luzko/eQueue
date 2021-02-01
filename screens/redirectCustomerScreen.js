import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, TextInput, Alert } from 'react-native'
import Bar from '../components/appbar'
import {Picker} from '@react-native-picker/picker'
import CheckBox from '@react-native-community/checkbox'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { getServices } from '../action/getServicesAction'
import { redirectCustomer } from '../action/redirectCustomerAction'
import { updateText, updateDisableButtom, updateImage } from '../action/updateStateAction'



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
                    <Picker

                        selectedValue={this.state.PickerValueHolder}
                        onValueChange={(itemValue, itemIndex) => (console.log(itemValue), this.setState({ PickerValueHolder: itemValue }))} >
                        <Picker.Item label="Выбор услуги..." value='default' />
                        {this.props.services.services.inner_services.map((item, key) =>
                            <Picker.Item

                                label={item.name}
                                value={item.id}
                                key={key} />
                        )}
                    </Picker>
                </View>
            )
        } else {
            return(
                <View style={styles.pickerStyle}>
                    <Picker>
                        <Picker.Item label="Выбор услуги..." value='default' />
                    </Picker>
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
            <View>
                <Bar />
                <Text style={styles.redirectText}>Перенаправление</Text>


                {this.servicesPicker()}
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
                    <View style={styles.returnText}>
                        <Text >С возвратом</Text>
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
                            height: heightPercentageToDP('5.3%'),
                            paddingTop: heightPercentageToDP('1%')
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('CallClient')
                        }}
                    />
                </View>
                <View>
                    <Button
                        title="Выполнить перенаправление"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('40%'),
                            marginLeft: widthPercentageToDP('46.5%'),
                            marginTop: heightPercentageToDP('-7.5%'),

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white'
                        }}
                        onPress={() => {
                            this.checkPicker()
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
        marginTop: heightPercentageToDP('20%')
    },
    pickerStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#ff7f50",
        borderRadius: 12,
        height: heightPercentageToDP('5%'),
        justifyContent: "center",
        marginTop: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('17%'),
        marginBottom: "2%"
    },
    inputText: {
        width: "80%",
        height: 100,
        borderRadius: 12,
        textAlign: 'left',
        paddingStart: 10,
        // marginBottom: heightPercentageToDP('10%'),
        color: "red",


    },
    inputStyle: {
        width: widthPercentageToDP('70%'),
        backgroundColor: "#ff7f50",
        borderRadius: 12,
        height: heightPercentageToDP('15%'),
        marginTop: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('17%'),

    },
    returnText: {
        marginLeft: widthPercentageToDP('15%'),
        marginTop: heightPercentageToDP('-3.5%'),
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