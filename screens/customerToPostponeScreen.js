import { Text } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Bar from '../components/appbar'
import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { postponeCustomer } from '../action/posponeCustomerAction';
import { updateText, updateDisableButtom, updateImage, changeTotalMinutes } from '../action/updateStateAction'
import { Col, Grid } from "react-native-easy-grid";
import { Shadow } from 'react-native-neomorph-shadows';
import { widthPercentageToDP, heightPercentageToDP } from '../utils/convertDimenToPercentage'

class CustomerToPostpone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            check: false
        };
    }


    postponeData() {
        let data = {
            "user_id": this.props.user.user.id,
            "comments": this.state.comment,
            "is_only_mine": this.state.check,
            "postponed_period": this.props.totalMinutes.totalMinutes
        }
        this.props.postponeCustomer(data),
            this.props.navigation.navigate('CallClient'),
            this.props.updateText(0),
            this.props.updateImage(0),
            this.props.updateDisableButtom(false, false, true, true, true, true, true, false)
    }

    render() {

        return (
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <Bar />

                <Text style={styles.postponeText}>Отложить клиента</Text>

                <View style={{ height: heightPercentageToDP('7%') }}>
                    <View style={{ marginBottom: heightPercentageToDP('-2.5%'), }}>
                        <Text style={styles.postponeToMinutes} >Отложить на {this.props.totalMinutes.totalMinutes ? this.props.totalMinutes.totalMinutes : "0"} минут</Text>
                    </View>


                    <Grid >

                        <Col style={{ width: widthPercentageToDP('67%') }}>
                            <TouchableOpacity>
                                <View >
                                    <Button
                                        raised={true}
                                        title="-"
                                        buttonStyle={{
                                            backgroundColor: "#F8D477",
                                            borderRadius: 2,
                                            width: widthPercentageToDP('5%'),
                                            height: heightPercentageToDP('3%'),

                                        }}

                                        containerStyle={{
                                            alignSelf: "flex-end"
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('3%'),
                                            width: widthPercentageToDP('5%'),
                                            paddingBottom: heightPercentageToDP('0.5%'),
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            alignItems: "center",
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            fontFamily: "Roboto"
                                        }}
                                        onPress={() => {
                                            this.props.changeTotalMinutes(this.props.totalMinutes.totalMinutes > 0 ? this.props.totalMinutes.totalMinutes -= 5 : this.props.totalMinutes.totalMinutes),
                                                console.log("Клиент отложен на: " + this.props.totalMinutes.totalMinutes + " минут")
                                        }}
                                    />

                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{ width: widthPercentageToDP('20%') }}>
                            <TouchableOpacity>
                                <View >
                                    <Button
                                        raised={true}
                                        title="+"
                                        buttonStyle={{
                                            backgroundColor: "#41D38D",
                                            borderRadius: 2,
                                            width: widthPercentageToDP('5%'),
                                            height: heightPercentageToDP('3%')
                                        }}

                                        containerStyle={{
                                            alignSelf: "flex-start",
                                            marginLeft: widthPercentageToDP('5%')
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('2.6%'),
                                            width: widthPercentageToDP('5%'),
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            alignItems: "center",
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            fontFamily: "Roboto"
                                        }}
                                        onPress={() => {
                                            this.props.changeTotalMinutes(this.props.totalMinutes.totalMinutes < 60 ? this.props.totalMinutes.totalMinutes += 5 : this.props.totalMinutes.totalMinutes),
                                                console.log("Клиент отложен на: " + this.props.totalMinutes.totalMinutes + " минут")
                                        }}
                                    />

                                </View>
                            </TouchableOpacity>
                        </Col>
                    </Grid>
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
                    <Text style={styles.asForMeText} >Только для меня</Text>
                </View >

                <View>
                    <Button
                        raised={true}
                        title="Отложить клиента"
                        buttonStyle={{
                            backgroundColor: "#41D38D",
                            borderRadius: 8,
                            width: widthPercentageToDP('70%'),
                            height: heightPercentageToDP('4.5%')
                        }}

                        containerStyle={{
                            alignSelf: "center",
                            marginBottom: heightPercentageToDP('2%'),
                            marginTop: heightPercentageToDP('4%'),
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
                            this.postponeData(),
                                this.props.changeTotalMinutes(0)
                        }}
                    />
                </View>

                <View>
                    <Button
                        raised={true}
                        title="Отмена"
                        buttonStyle={{
                            backgroundColor: "#E9E9E9",
                            borderRadius: 8,
                            width: widthPercentageToDP('70%'),
                            height: heightPercentageToDP('4.5%')
                        }}

                        containerStyle={{
                            alignSelf: "center",
                            marginBottom: heightPercentageToDP('25%')
                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('1.8%'),
                            color: "#AFAFAF",
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

    postponeText: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('13%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#A1A0A0",
        marginBottom: heightPercentageToDP('4%')
    },

    postponeToMinutesStyle: {
        width: widthPercentageToDP('43%'),
        backgroundColor: "#E9E9E9",
        borderRadius: 8,
        height: heightPercentageToDP('4.5%'),
        marginLeft: widthPercentageToDP('15%'),
        marginTop: heightPercentageToDP('2%'),
        justifyContent: "center"
    },

    postponeToMinutes: {
        fontSize: heightPercentageToDP('2%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        color: "#AFAFAF",
        marginLeft: widthPercentageToDP('16%')
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
        alignSelf: "center"
    },

    asForMeText: {
        marginLeft: widthPercentageToDP('17.5%'),
        marginTop: heightPercentageToDP('-3.65%'),
        fontSize: heightPercentageToDP('1.9%'),
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

const mapStateToProps = state => {
    return {
        user: state.user,
        customer: state.customer,
        text: state.text,
        image: state.image,
        totalMinutes: state.totalMinutes,
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
        changeTotalMinutes: (totalMinutes) => dispatch(changeTotalMinutes(totalMinutes)),
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