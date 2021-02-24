import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, PixelRatio, Text, StatusBar } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { selectIpAddress , changeText1, changeText2, changeText3, changeText4} from '../action/updateStateAction'
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

class ServerNoConnection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visiable: true
        };
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
                                <Text style={styles.textNotConnection}>Нет соединения с сервером!</Text>
                            </View>
                            <View >
                                <Shadow
                                    style={{
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowColor: "rgba(253, 174, 190, 0.7)",
                                        shadowRadius: 4,
                                        width: widthPercentageToDP('38%'),
                                        borderRadius: 4,
                                        height: heightPercentageToDP('5%'),
                                        backgroundColor: "#FDAEBE",
                                        marginLeft: widthPercentageToDP('22%')
                                    }}
                                >
                                    <Button
                                        title="Попробовать снова"
                                        buttonStyle={{
                                            backgroundColor: "#FDAEBE",
                                            borderRadius: 4,
                                            height: heightPercentageToDP('5%'),
                                            width: widthPercentageToDP('38%')
                                        }}

                                        containerStyle={{
                                            alignSelf: "center"
                                        }}

                                        titleStyle={{
                                            fontSize: heightPercentageToDP('1.67%'),
                                            color: '#FFFFFF',
                                            fontWeight: "bold",
                                            fontFamily: "Roboto",
                                            alignItems: "center"
                                        }}
                                        onPress={() => {
                                            this.props.changeText1(null),
                                            this.props.changeText2(null),
                                            this.props.changeText3(null),
                                            this.props.changeText4(null),
                                                this.setState({ visiable: false }),
                                                this.props.navigation.replace("ConnectingToIP")
                                        }}
                                    />
                                </Shadow>
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

    textNotConnection: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: heightPercentageToDP('2.3%'),
        color: '#A1A0A0',
        marginTop: heightPercentageToDP('7%'),
        marginBottom: heightPercentageToDP('4%')
    }
});

const mapStateToProps = state => {
    return {
        ipAddress: state.ipAddress
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectIpAddress: (ipAddress) => dispatch(selectIpAddress(ipAddress)),
        changeText1: (text_1) => dispatch(changeText1(text_1)),
        changeText2: (text_2) => dispatch(changeText2(text_2)),
        changeText3: (text_3) => dispatch(changeText3(text_3)),
        changeText4: (text_4) => dispatch(changeText4(text_4))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerNoConnection); 