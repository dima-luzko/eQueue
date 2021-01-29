import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { postponePoolInfo } from '../action/getPosponedPoolInfoAction';
import { invitePostponedCustomer } from '../action/invitePostponedCustomerAction'
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

    }

    // list() {
    //     const { customer } = this.props.customer

    //     if (customer && customer.length > 0) {

    //         return (

    //             <View>
    //                 <Picker
    //                     selectedValue={this.state.PickerValueHolder}
    //                     onValueChange={(itemValue) => (this.setState({ PickerValueHolder: itemValue }))} >
    //                     <Picker.Item label="Выберите пользователя..." value='default' />
    //                     {customer.map((item, key) =>
    //                         <Picker.Item
    //                             label={item.prefix + item.number + " - " + item.to_service.name} value={item.prefix + item.number + " - " + item.to_service.name} key={item.id + ""} />
    //                     )}
    //                 </Picker>
    //             </View>
    //         )
    //     }
    // }


    list1() {
        const { postponeCustomer } = this.props.postponeCustomer
        if (postponeCustomer && postponeCustomer.length > 0) {
            return (
                <View>
                    <ScrollView
                        style={{ height: heightPercentageToDP('42%') }}
                        horizontal={true}
                    >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={postponeCustomer}
                            keyExtractor = {item => item.id.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ textNumber: item.prefix + item.number + " - " + item.to_service.name }),
                                            this.setState({ customerId: item.id + "" })
                                    }}
                                >
                                    <View style={styles.driwer}>

                                        <Text style={styles.numberAndServiceText}>{item.prefix + item.number + " - " + item.to_service.name} </Text>

                                        <Text style={styles.cause}>Причина: {item.post_status}</Text>
                                    </View>
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
            <View >
                <Bar />
                <View style={styles.bottomAppBar}>
                    <Text style={styles.clientText}>Выбран клиент: {this.state.textNumber} </Text>
                </View>

                {this.list1() ? this.list1() : <Text style={styles.postponeClientText}>Отложеных клиентов нету!</Text>}

                <View style={{ marginTop: heightPercentageToDP('2%') }}>
                    <Button
                        title="Отмена"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('25%'),
                            marginLeft: widthPercentageToDP('20%'),


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
                        title="Вызвать"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('25%'),
                            marginLeft: widthPercentageToDP('60%'),
                            marginTop: heightPercentageToDP('-5%'),

                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white'
                        }}
                        onPress={() => {
                            this.check()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    bottomAppBar: {
        width: widthPercentageToDP('85%'),
        marginLeft: widthPercentageToDP('8%'),
        backgroundColor: 'green',
        height: heightPercentageToDP('8%'),
        marginTop: heightPercentageToDP('10%'),
        borderRadius: 12
    },

    clientText: {
        fontSize: heightPercentageToDP('2.5%'),
        marginLeft: widthPercentageToDP('1.5%'),
        marginTop: heightPercentageToDP('0.5%')
    },

    driwer: {
        backgroundColor: '#64ffda',
        width: widthPercentageToDP('70%'),
        marginLeft: widthPercentageToDP('17%'),
        marginTop: heightPercentageToDP('2%'),
        height: heightPercentageToDP('15%'),
        borderRadius: 12
    },

    numberAndServiceText: {
        fontSize: heightPercentageToDP('2.2%'),
        marginLeft: widthPercentageToDP('4.5%'),
        marginTop: heightPercentageToDP('0.5%')
    },

    cause: {
        fontSize: heightPercentageToDP('2.2%'),
        marginLeft: widthPercentageToDP('4.5%'),
        marginTop: heightPercentageToDP('0.5%')
    },

    postponeClientText: {
        height: heightPercentageToDP('40%'),
        fontSize: heightPercentageToDP('2.5%'),
        alignSelf: 'center',
        marginTop: heightPercentageToDP('2%')
    }


})

const mapStateToProps = state => {
    return {
        user: state.user,
        customer: state.customer,
        postponeCustomer: state.postponeCustomer,
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
        postponePoolInfo: () => dispatch(postponePoolInfo()),
        invitePostponedCustomer: (userId, customerId) => dispatch(invitePostponedCustomer(userId, customerId)),
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

export default connect(mapStateToProps, mapDispatchToProps)(InvitePostponeCustomer);