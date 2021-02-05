import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { changeFlexPriority } from '../action/changeFlexPriorityAction'
import { Col, Grid } from "react-native-easy-grid"
import { Shadow } from 'react-native-neomorph-shadows'



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


const DATA = [
    {
        id: "0",
        name: "Низкий",
    },
    {
        id: "1",
        name: "Основной",
    },
    {
        id: "2",
        name: "V.I.P",
    },
];

class ChangeFlexPriority extends Component {

    showAlert() {
        Alert.alert(
            "Ошибка",
            "Необходимо выбрать услугу и приоритет!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    constructor() {
        super();
        this.state = {
            selected: null,
            selectService: null

        };
    }

    checkPriorityList() {
        if (this.state.selectService && this.state.selected) {
            this.props.changeFlexPriority(this.props.user.user.id, this.state.selectService, this.state.selected)
            this.props.navigation.navigate('CallClient')
        } else {
            this.showAlert()
        }
    }

    list() {
        const { user } = this.props.user
        if (user.plan && user.plan.length > 0) {
            return (
                <View >
                    <FlatList
                        ListFooterComponent={<View><Text></Text></View>}
                        showsVerticalScrollIndicator={false}
                        data={user.plan.filter((val) => val.flex === true)}
                        ListEmptyComponent={<View><Text style={styles.text}>Нет доступных услуг для изменения!</Text></View>}
                        renderItem={({ item }) =>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ selectService: item.service.id })
                                }}
                            >
                                {item.service.id === this.state.selectService

                                    ?
                                    <View
                                        style={{
                                            backgroundColor: item.service.id === this.state.selectService ? "#41D38D" : "#E9E9E9",
                                            padding: heightPercentageToDP('2%'),
                                            marginVertical: heightPercentageToDP('1%'),
                                            width: widthPercentageToDP('35%'),
                                            height: heightPercentageToDP('10%'),
                                            marginLeft: widthPercentageToDP('8%'),
                                            borderRadius: 8,
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Shadow
                                            inner
                                            style={{
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowColor: "rgba(0, 0, 0, 0.25)",
                                                shadowRadius: 4,
                                                width: widthPercentageToDP('35%'),
                                                borderRadius: 8,
                                                justifyContent: "center",
                                                marginLeft: widthPercentageToDP('-3.5%'),
                                                height: heightPercentageToDP('10%')
                                            }}
                                        >

                                            <Text style={{
                                                fontSize: heightPercentageToDP('2%'),
                                                color: item.service.id === this.state.selectService ? "#FFFFFF" : "#BABABA",
                                                fontWeight: "500",
                                                fontFamily: "Roboto",
                                                alignItems: "center",
                                                textAlign: "center"
                                            }}>{item.service.name} </Text>
                                        </Shadow>
                                    </View>
                                    :

                                    <View
                                        style={{
                                            backgroundColor: item.service.id === this.state.selectService ? "#41D38D" : "#E9E9E9",
                                            padding: heightPercentageToDP('2%'),
                                            marginVertical: heightPercentageToDP('1%'),
                                            width: widthPercentageToDP('35%'),
                                            height: heightPercentageToDP('10%'),
                                            marginLeft: widthPercentageToDP('8%'),
                                            borderRadius: 8,
                                            justifyContent: "center",
                                            elevation: 3
                                        }}
                                    >
                                        <Text style={{
                                            fontSize: heightPercentageToDP('2%'),
                                            color: item.service.id === this.state.selectService ? "#FFFFFF" : "#BABABA",
                                            fontWeight: "500",
                                            fontFamily: "Roboto",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}>{item.service.name} </Text>
                                    </View>
                                }
                            </TouchableOpacity>

                        }
                    />
                </View>
            )
        }

    }

    priorityList() {
        return (
            <View>
                <FlatList
                    ListFooterComponent={<View><Text></Text></View>}
                    showsVerticalScrollIndicator={false}
                    data={DATA}

                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ selected: item.id })
                            }}
                        >

                            {item.id === this.state.selected

                                ?
                                <View
                                    style={{
                                        backgroundColor: item.id === this.state.selected ? "#41D38D" : "#E9E9E9",
                                        padding: heightPercentageToDP('2%'),
                                        marginVertical: heightPercentageToDP('1%'),
                                        width: widthPercentageToDP('35%'),
                                        height: heightPercentageToDP('10%'),
                                        marginLeft: widthPercentageToDP('8%'),
                                        borderRadius: 8,
                                        justifyContent: "center"
                                    }}
                                >

                                    <Shadow
                                        inner
                                        style={{
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowColor: "rgba(0, 0, 0, 0.25)",
                                            shadowRadius: 4,
                                            width: widthPercentageToDP('35%'),
                                            borderRadius: 8,
                                            justifyContent: "center",
                                            marginLeft: widthPercentageToDP('-3.5%'),
                                            height: heightPercentageToDP('10%')
                                        }}
                                    >

                                        <Text style={{
                                            fontSize: heightPercentageToDP('2%'),
                                            color: item.id === this.state.selected ? "#FFFFFF" : "#BABABA",
                                            fontWeight: "500",
                                            fontFamily: "Roboto",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}>{item.name} </Text>
                                    </Shadow>
                                </View>
                                :
                                <View
                                    style={{
                                        backgroundColor: item.id === this.state.selected ? "#41D38D" : "#E9E9E9",
                                        padding: heightPercentageToDP('2%'),
                                        marginVertical: heightPercentageToDP('1%'),
                                        width: widthPercentageToDP('35%'),
                                        height: heightPercentageToDP('10%'),
                                        marginLeft: widthPercentageToDP('8%'),
                                        borderRadius: 8,
                                        justifyContent: "center",
                                        elevation: 3
                                    }}
                                >

                                    <Text style={{
                                        fontSize: heightPercentageToDP('2%'),
                                        color: item.id === this.state.selected ? "#FFFFFF" : "#BABABA",
                                        fontWeight: "500",
                                        fontFamily: "Roboto",
                                        alignItems: "center",
                                        textAlign: "center"
                                    }}>{item.name} </Text>

                                </View>
                            }

                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>)

    }

    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
                <Bar />
                <View style={{ height: heightPercentageToDP('70%') }}>
                    <Grid>
                        <Col style={{ height: heightPercentageToDP('40%') }}>
                            <Text style={styles.serviceList}>Список услуг: </Text>
                            {this.list()}
                        </Col>
                        <Col style={{ height: heightPercentageToDP('40%') }}>
                            <Text style={styles.priorityList}>Приоритет: </Text>
                            {this.priorityList()}
                        </Col>
                    </Grid>

                </View>

                <View style={{ marginTop: heightPercentageToDP('2%') }}>

                    <Button
                        raised={true}
                        title="Изменить приоритет"
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
                            color: "#FFFFFF",
                            textAlign: "center",
                            alignItems: "center",
                            fontWeight: "500",
                            fontStyle: "normal",
                            fontFamily: "Roboto"
                        }}
                        onPress={() => {
                            this.checkPriorityList()
                        }}
                    />

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
    serviceList: {
        color: "#A1A0A0",
        fontSize: heightPercentageToDP('2.3%'),
        height: heightPercentageToDP('3%'),
        marginTop: heightPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('2%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        alignItems: "center"
    },

    text: {
        fontSize: heightPercentageToDP('2%'),
        color: "#B6B6B6",
        fontWeight: "500",
        fontFamily: "Roboto",
        alignItems: "center",
        textAlign: "center",
        marginTop: heightPercentageToDP('3%')
    },

    priorityList: {
        color: "#A1A0A0",
        fontSize: heightPercentageToDP('2.3%'),
        height: heightPercentageToDP('3%'),
        marginTop: heightPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('2%'),
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        alignItems: "center"
    },


    listEmpty: {
        backgroundColor: "#E9E9E9",
        padding: heightPercentageToDP('2%'),
        marginVertical: heightPercentageToDP('1%'),
        width: widthPercentageToDP('35%'),
        height: heightPercentageToDP('10%'),
        marginLeft: widthPercentageToDP('8%'),
        borderRadius: 8,
        justifyContent: "center",
        elevation: 3
    }

});

const mapStateToProps = state => {
    return {
        user: state.user,
        changeFlexPriority: state.changeFlexPriority

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeFlexPriority: (userId, serviceId, priority_to_set) => dispatch(changeFlexPriority(userId, serviceId, priority_to_set))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeFlexPriority);
