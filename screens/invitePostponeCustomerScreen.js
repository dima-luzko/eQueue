import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { postponePoolInfo } from '../action/getPosponedPoolInfoAction';
import { invitePostponedCustomer } from '../action/invitePostponedCustomerAction'
import { updateText, updateDisableButtom, updateImage, showPostponedTotalLength } from '../action/updateStateAction'
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

class InvitePostponeCustomer extends Component {

    showAlert() {
        Alert.alert(
            "Ошибка",
            "Невозможно вызвать клиента, не выбрав его!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor() {
        super();
        this.state = {
            PickerValueHolder: '',
            comment: "",
            textNumber: "",
            customerId: 0
        };
    }

    componentDidMount() {
        this.props.postponePoolInfo()
        let queueLength = 0;
        setTimeout(() => {
            if (this.props.postponeCustomer.postponeCustomer && this.props.postponeCustomer.postponeCustomer.length > 0) {
                queueLength = this.props.postponeCustomer.postponeCustomer.length
                console.log("Общее количество отложенных клиентов в очереди: ", queueLength ? queueLength : "0")
            }
            this.props.showPostponedTotalLength(queueLength)
        }, 100)
    }

    postponedClientList() {
        const { postponeCustomer } = this.props.postponeCustomer
        if (postponeCustomer && postponeCustomer.length > 0) {
            return (
                <View>
                    <ScrollView
                        style={{ height: heightPercentageToDP('50%') }}
                        horizontal={true}
                    >
                        <FlatList
                            ListFooterComponent={<View><Text></Text></View>}
                            showsVerticalScrollIndicator={false}
                            data={postponeCustomer}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ data: postponeCustomer })
                                        this.setState({ textNumber: item.prefix + item.number + " - " + item.to_service.name }),
                                            this.setState({ customerId: item.id + "" })
                                    }}
                                >

                                    {item.id + "" === this.state.customerId

                                        ?

                                        <View style={{
                                            backgroundColor: item.id + "" === this.state.customerId ? "#41D38D" : "#E9E9E9",
                                            width: item.id + "" === this.state.customerId ? widthPercentageToDP('75%') : widthPercentageToDP('70%'),
                                            marginTop: heightPercentageToDP('2%'),
                                            height: heightPercentageToDP('10%'),
                                            borderRadius: 12,
                                            marginLeft: item.id + "" === this.state.customerId ? widthPercentageToDP('13%') : widthPercentageToDP('15%')
                                        }}

                                        >
                                            <Shadow
                                                inner
                                                style={{
                                                    shadowOffset: { width: 0, height: 2 },
                                                    shadowColor: "rgba(0, 0, 0, 0.25)",
                                                    shadowRadius: 4,
                                                    width: widthPercentageToDP('75%'),
                                                    borderRadius: 12,
                                                    height: heightPercentageToDP('10%'),
                                                }}
                                            >

                                                <Text numberOfLines={1}
                                                    style={{
                                                        fontSize: heightPercentageToDP('2%'),
                                                        marginTop: heightPercentageToDP('0.5%'),
                                                        fontFamily: "Roboto",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        color: item.id + "" === this.state.customerId ? "#FFFFFF" : "#AFAFAF",
                                                        textAlign: "center"
                                                    }}>{item.prefix + item.number + " - " + item.to_service.name} </Text>
                                                <Text numberOfLines={2}
                                                    style={{
                                                        fontSize: heightPercentageToDP('2%'),
                                                        marginLeft: widthPercentageToDP('4.5%'),
                                                        marginTop: heightPercentageToDP('0.5%'),
                                                        fontFamily: "Roboto",
                                                        fontStyle: "normal",
                                                        fontWeight: "500",
                                                        color: item.id + "" === this.state.customerId ? "#FFFFFF" : "#AFAFAF"
                                                    }}>{item.post_status}</Text>
                                            </Shadow>
                                        </View>

                                        :

                                        <View style={{
                                            backgroundColor: item.id + "" === this.state.customerId ? "#41D38D" : "#E9E9E9",
                                            width: item.id + "" === this.state.customerId ? widthPercentageToDP('75%') : widthPercentageToDP('70%'),
                                            marginTop: heightPercentageToDP('2%'),
                                            height: heightPercentageToDP('10%'),
                                            borderRadius: 12,
                                            marginLeft: item.id + "" === this.state.customerId ? widthPercentageToDP('13%') : widthPercentageToDP('15%'),
                                            elevation: 3
                                        }}

                                        >
                                            <Text numberOfLines={1}
                                                style={{
                                                    fontSize: heightPercentageToDP('2%'),
                                                    marginTop: heightPercentageToDP('0.5%'),
                                                    fontFamily: "Roboto",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    color: item.id + "" === this.state.customerId ? "#FFFFFF" : "#AFAFAF",
                                                    textAlign: "center"
                                                }}>{item.prefix + item.number + " - " + item.to_service.name} </Text>
                                            <Text numberOfLines={2}
                                                style={{
                                                    fontSize: heightPercentageToDP('2%'),
                                                    marginLeft: widthPercentageToDP('4.5%'),
                                                    marginTop: heightPercentageToDP('0.5%'),
                                                    fontFamily: "Roboto",
                                                    fontStyle: "normal",
                                                    fontWeight: "500",
                                                    color: item.id + "" === this.state.customerId ? "#FFFFFF" : "#AFAFAF"
                                                }}>{item.post_status}</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            }
                        />
                    </ScrollView>
                </View>
            )
        }
    }

    check() {
        if (this.state.textNumber) {
            this.props.invitePostponedCustomer(this.props.user.user.id, this.state.customerId),
                this.props.navigation.navigate('CallClient'),
                this.props.updateDisableButtom(false, true, false, false, true, true, true, true)
            this.props.updateText(1),
                this.props.updateImage(1)
        } else {
            this.showAlert()
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <Bar />

                <View>
                    <Text style={styles.valueInQueue}>Общее количество отложеных клиентов в очереди: {this.props.posponedLength.posponedLength ? this.props.posponedLength.posponedLength : "0"}</Text>
                </View>

                <View style={{ height: heightPercentageToDP('52%') }}>
                    {this.postponedClientList()}
                </View>

                <View style={{ marginTop: heightPercentageToDP('2%') }}>

                    <Button
                        disabled={this.props.posponedLength.posponedLength ? false : true}
                        raised={true}
                        title="Вызвать клиента"
                        buttonStyle={{
                            backgroundColor: "#41D38D",
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
                            color: this.props.posponedLength.posponedLength ? "#FFFFFF" : "#B6B6B6",
                            textAlign: "center",
                            alignItems: "center",
                            fontWeight: "500",
                            fontStyle: "normal",
                            fontFamily: "Roboto"
                        }}
                        onPress={() => {
                            this.check()
                        }}
                    />

                    <TouchableOpacity>
                        <Button
                            raised={true}
                            title="Отмена"
                            buttonStyle={{
                                backgroundColor: this.props.posponedLength.posponedLength ? "#E9E9E9" : "#41D38D",
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
                                color: this.props.posponedLength.posponedLength ? "#AFAFAF" : "#FFFFFF",
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
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    valueInQueue: {
        marginTop: heightPercentageToDP('5%'),
        textAlign: "center",
        fontSize: heightPercentageToDP('2.4%'),
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontStyle: "normal",
        color: "#A1A0A0",
        marginBottom: heightPercentageToDP('6%'),
    },

    clientText: {
        width: widthPercentageToDP('45%'),
        fontSize: heightPercentageToDP('2%'),
        marginLeft: widthPercentageToDP('1.5%'),
        marginTop: heightPercentageToDP('0.5%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        color: "#FFFFFF"
    }
})

const mapStateToProps = state => {
    return {
        user: state.user,
        customer: state.customer,
        postponeCustomer: state.postponeCustomer,
        text: state.text,
        totalMinutes: state.totalMinutes,
        image: state.image,
        disableButtonCallClient: state.disableButtonCallClient,
        disableButtonInvitePostponeCustomer: state.disableButtonInvitePostponeCustomer,
        disableButtonClientNotEnter: state.disableButtonClientNotEnter,
        disableButtonStartClient: state.disableButtonStartClient,
        disableButtonRedirectClient: state.disableButtonRedirectClient,
        disableButtonPostponeClient: state.disableButtonPostponeClient,
        disableFinishClient: state.disableFinishClient,
        disableButtonExit: state.disableButtonExit,
        posponedLength: state.posponedLength
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postponePoolInfo: () => dispatch(postponePoolInfo()),
        invitePostponedCustomer: (userId, customerId) => dispatch(invitePostponedCustomer(userId, customerId)),
        updateText: (text) => dispatch(updateText(text)),
        updateImage: (image) => dispatch(updateImage(image)),
        showPostponedTotalLength: (posponedLength) => dispatch(showPostponedTotalLength(posponedLength)),
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

export default connect(mapStateToProps, mapDispatchToProps)(InvitePostponeCustomer);