import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, Text } from 'react-native'
import SettingsBar from '../components/settingBar'
import CheckBox from '@react-native-community/checkbox'
import { Col, Grid, Row } from "react-native-easy-grid"
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { postponedCheck, redirectCheck } from '../action/updateStateAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

class Setting extends Component {

    render() {
        return (
            <View>
                <SettingsBar />
                <Text style={styles.headText}>Операции для работы с клиентами</Text>
                <Grid>
                    <Row>
                        <Col style={{ width: widthPercentageToDP('10%'), marginLeft: widthPercentageToDP('8%') }}>
                            <CheckBox
                                value={this.props.postponedCheckButton.postponedCheckButton}
                                onValueChange={(newValue => {this.props.postponedCheck(newValue),AsyncStorage.setItem('postponedCheck',newValue + "")})}
                            />
                        </Col>
                        <Col>
                            <Text style={styles.text}>Отложить</Text>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: heightPercentageToDP('5%') }}>
                        <Col style={{ width: widthPercentageToDP('10%'), marginLeft: widthPercentageToDP('8%') }}>
                            <CheckBox
                                value={this.props.redirectCheckButton.redirectCheckButton}
                                onValueChange={(newValue => { this.props.redirectCheck(newValue), AsyncStorage.setItem('redirectCheck',newValue + "")})}
                            />
                        </Col>
                        <Col>
                            <Text style={styles.text}>Перенаправить</Text>
                        </Col>
                    </Row>
                </Grid>
                <View>
                    <Button
                        raised={true}
                        title={"ОК"}
                        buttonStyle={{
                            backgroundColor: "#41D38D",
                            borderRadius: 8,
                            width: widthPercentageToDP('45%'),
                            height: heightPercentageToDP('4.5%')
                        }}

                        containerStyle={{
                            alignSelf: "center",
                            marginTop: heightPercentageToDP('15%'),
                            alignItems: "center"
                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2.5%'),
                            color: "#FFFFFF",
                            textAlign: "center",
                            alignItems: "center",
                            fontWeight: "500",
                            fontStyle: "normal",
                            fontFamily: "Roboto"
                        }}
                        onPress={() => {
                            this.props.navigation.navigate("CallClient")
                        }}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headText: {
        alignSelf: "center",
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('5%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        alignItems: "center",
        color: "#A1A0A0",
        marginBottom: heightPercentageToDP('3%')
    },

    text: {
        alignSelf: "flex-start",
        marginTop: heightPercentageToDP('0.2%'),
        fontSize: heightPercentageToDP('2.5%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        color: "#A1A0A0"
    }
});

const mapStateToProps = state => {
    return {
        redirectCheckButton: state.redirectCheckButton,
        postponedCheckButton: state.postponedCheckButton,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirectCheck: (redirectCheckButton) => dispatch(redirectCheck(redirectCheckButton)),
        postponedCheck: (postponedCheckButton) => dispatch(postponedCheck(postponedCheckButton)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

