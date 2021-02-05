import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { getResultList } from '../action/resultListAction'
import { getFinishCustomer } from '../action/callClientAction'
import { updateText, updateDisableButtom, updateImage } from '../action/updateStateAction'
import { Row, Grid } from "react-native-easy-grid";


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


class ResultList extends Component {

    showAlert() {
        Alert.alert(
            "Ошибка",
            "Необходимо сначала выбрать результат работы.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor() {
        super();
        this.state = {
            selected: null
        };
    }

    componentDidMount() {
        this.props.getResultList()
    }

    checkResultList() {
        if (this.state.selected) {
            this.props.getFinishCustomer(this.finishCustomer())
            this.props.navigation.navigate('CallClient'),
                this.props.updateDisableButtom(false, false, true, true, true, true, true, false),
                this.props.updateText(0),
                this.props.updateImage(0)
        } else {
            this.showAlert()
        }
    }

    list() {
        const { resultList } = this.props.resultList
        if (resultList && resultList.result.length > 0) {
            return (
                <View >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={<View><Text></Text></View>}
                        data={resultList.result}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ selected: item.id })
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: item.id === this.state.selected ? "#41D38D" : "#E9E9E9",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: widthPercentageToDP('65%'),
                                        borderRadius: 8,
                                        marginTop: heightPercentageToDP('3%'),
                                        height: heightPercentageToDP('4.5%'),
                                        marginLeft: widthPercentageToDP('18%'),
                                        elevation:3
                                    }}
                                >
                                        <Text style={{
                                            fontSize: heightPercentageToDP('2%'),
                                            color: item.id === this.state.selected ? "#FFFFFF" : '#AFAFAF',
                                            fontWeight: "500",
                                            fontFamily: "Roboto",
                                            alignItems: "center",
                                            textAlign: "center"

                                        }}>{item.name} </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>


            )
        }
    }

    finishCustomer() {
        return (
            {
                user_id: this.props.user.user.id,
                result_id: this.state.selected
            }
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <Bar />
                <Text style={styles.resultText}>Закончить работу с клиентом</Text>
                <Grid>

                    <Row size={25}>
                        {this.list()}
                    </Row>
                    <Row size={30}>
                        <View style={{ alignSelf: "flex-start" }}>
                            <Button
                                raised={true}
                                title="OK"
                                buttonStyle={{
                                    backgroundColor: "#E9E9E9",
                                    width: widthPercentageToDP('65%'),
                                    borderRadius: 8,
                                    height: heightPercentageToDP('4.5%'),

                                }}
                                containerStyle={{
                                    marginLeft: widthPercentageToDP('18%')
                                }}




                                titleStyle={{
                                    fontSize: heightPercentageToDP('2%'),
                                    color: '#AFAFAF',
                                    fontWeight: "500",
                                    fontFamily: "Roboto",
                                    alignItems: "center",
                                    textAlign: "center"
                                }}
                                onPress={() => {
                                    this.checkResultList()
                                }}
                            />
                        </View>

                    </Row>
                </Grid>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    resultText: {
        alignSelf: "center",
        fontSize: heightPercentageToDP('2.5%'),
        marginTop: heightPercentageToDP('20%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        alignItems: "center",
        color: "#A1A0A0",
        marginBottom: heightPercentageToDP('8%')
    }
});

const mapStateToProps = state => {
    return {
        user: state.user,
        resultList: state.resultList,
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
        getFinishCustomer: (data) => dispatch(getFinishCustomer(data)),
        getResultList: () => dispatch(getResultList()),
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);
