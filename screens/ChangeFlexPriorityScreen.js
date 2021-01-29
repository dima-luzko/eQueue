import React, { Component } from 'react'
import { View, StyleSheet, PixelRatio, Dimensions, Text, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native'
import Bar from '../components/appbar'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { changeFlexPriority } from '../action/changeFlexPriorityAction'
import { Col, Grid } from "react-native-easy-grid";


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
                    <ScrollView
                        style={{ height: heightPercentageToDP('40%') }}
                        horizontal={true}
                    >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={user.plan.filter((val) => val.flex === true)}
                            ListEmptyComponent={<View style = {styles.listEmpty}><Text style={styles.text}>Нет доступных услуг для изменения!</Text></View>}
                            renderItem={({ item }) =>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ selectService: item.service.id })
                                    }}
                                >

                                    <View
                                        style={{
                                            backgroundColor: item.service.id === this.state.selectService ? "#87cefa" : "#f9c2ff",
                                            padding: heightPercentageToDP('2%'),
                                            marginVertical: heightPercentageToDP('1%'),
                                            width: widthPercentageToDP('35%'),
                                            marginLeft: widthPercentageToDP('5%'),
                                            borderRadius: 5
                                        }}
                                    >
                                        <Text style={styles.text}>{item.service.name} </Text>
                                    </View>
                                </TouchableOpacity>

                            }
                        />
                    </ScrollView>
                </View>
            )
        }

    }

    priorityList() {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={DATA}

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
                                    width: widthPercentageToDP('35%'),
                                    marginLeft: widthPercentageToDP('8%'),
                                    borderRadius: 5
                                }}
                            >

                                <Text style={styles.text}>{item.name} </Text>

                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id}
                />
            </View>)

    }

    render() {
        return (
            <View>
                <Bar />
                <View>
                    <Grid>
                        <Col style={{ height: heightPercentageToDP('40%') }}>
                            <Text style={styles.serviceList}>Список услуг: </Text>
                            {this.list()}
                        </Col>
                        <Col style={{ height: heightPercentageToDP('40%') }}>
                            <Text style={styles.priorityList}>Изменить приоритет: </Text>
                            {this.priorityList()}
                        </Col>
                    </Grid>

                </View>

                <View >
                    <Button
                        title="Изменить приоритет"
                        buttonStyle={{
                            backgroundColor: 'red'
                        }}

                        containerStyle={{
                            width: widthPercentageToDP('25%'),
                            marginLeft: widthPercentageToDP('55%'),
                            marginTop: heightPercentageToDP('55%')
                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('6%')
                        }}
                        onPress={() => {
                            this.checkPriorityList()
                        }}
                    />
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
                            marginTop: heightPercentageToDP('-8%')
                        }}

                        titleStyle={{
                            fontSize: heightPercentageToDP('2%'),
                            color: 'white',
                            height: heightPercentageToDP('6%'),
                            textAlignVertical: 'center'
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
        marginLeft: widthPercentageToDP('7%'),
        fontSize: heightPercentageToDP('2.3%'),
        height: heightPercentageToDP('3%'),
        marginTop: heightPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('2%'),
    },

    priorityList: {
        marginLeft: widthPercentageToDP('2%'),
        fontSize: heightPercentageToDP('2.3%'),
        height: heightPercentageToDP('3%'),
        marginTop: heightPercentageToDP('5%'),
        marginBottom: heightPercentageToDP('2%'),
    },

    text: {
        alignSelf: 'center',
        fontSize: heightPercentageToDP('1.8%')
    },

    noServiceForm: {
        backgroundColor: "#d2b48c",
        padding: heightPercentageToDP('2%'),
        marginVertical: heightPercentageToDP('1%'),
        width: widthPercentageToDP('35%'),
        marginLeft: widthPercentageToDP('5%'),
        borderRadius: 5
    }, 

    listEmpty: {
        backgroundColor: "#f9c2ff",
        padding: heightPercentageToDP('2%'),
        marginVertical: heightPercentageToDP('1%'),
        width: widthPercentageToDP('35%'),
        marginLeft: widthPercentageToDP('5%'),
        borderRadius: 5
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
