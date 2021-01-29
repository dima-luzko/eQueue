import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { getResultList } from '../action/resultListAction'
import { getFinishCustomer } from '../action/callClientAction'
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
                <View>
                    <ScrollView
                        style={{ height: heightPercentageToDP('40%') }}
                        horizontal={true}
                    >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={resultList.result}
                            keyExtractor = {item => item.id.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ selected: item.id })
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: item.id === this.state.selected ? "#87cefa" : "#f9c2ff",
                                            padding: heightPercentageToDP('2%'),
                                            marginVertical: heightPercentageToDP('1%'),
                                            width: widthPercentageToDP('50%'),
                                            marginLeft: widthPercentageToDP('25%'),
                                            borderRadius: 5
                                        }}
                                    >

                                        <Text >{item.name} </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </ScrollView>
                    <View style={{ height: heightPercentageToDP('10%') }}>
                        <Button
                            title="OK"
                            buttonStyle={{
                                backgroundColor: 'red'
                            }}

                            containerStyle={{
                                width: widthPercentageToDP('25%'),
                                marginLeft: widthPercentageToDP('37%'),
                                marginTop: heightPercentageToDP('5%')
                            }}

                            titleStyle={{
                                fontSize: heightPercentageToDP('2%'),
                                color: 'white',
                                height: heightPercentageToDP('3%')
                            }}
                            onPress={() => {
                                this.checkResultList()
                            }}
                        />
                    </View>
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
            <View>
                <Bar />
                <View>
                    <Text style={styles.resultText}>Выберите результат работы: </Text>
                </View>
                <View>
                    {this.list()}
                </View>


            </View>
        )
    }

}

const styles = StyleSheet.create({
    resultText: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.3%'),
        height: heightPercentageToDP('3%'),
        marginTop: heightPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('5%'),
    },

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
