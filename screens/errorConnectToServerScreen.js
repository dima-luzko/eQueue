import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, PixelRatio, Text } from 'react-native'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { checkServerState } from '../action/serverStateAction'


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


class ErrorConnectToServer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            visiable: true,
            text: 0,
            buttom: 0
        };
    }

    componentDidMount() {

        this.checkServer()
    }


    changeText() {
        switch (this.state.text) {
            case 0:
                return (
                    <Text style={styles.textNotConnection}>Нет подключения!</Text>
                )
            case 1:
                return (
                    <Text style={styles.textConnection}>Подключение установлено!</Text>
                )
        }
    }

    checkServer() {
        setInterval(() => {
            setTimeout(() => {
                this.props.checkServerState(this.props.ipAddress.ipAddress)
                setTimeout(() => {

                    if (this.props.server.server) {
                        this.setState({ text: 1, buttom: 1 })
                    } else {
                        this.setState({ text: 0, buttom: 0 })
                    }
                }, 100);
        }, 300);
    }, 2000);

}

changeButtom() {
    switch (this.state.buttom) {
        case 0:
            return (
                <Button
                    title="Попробовать снова"
                    buttonStyle={{
                        backgroundColor: 'red'
                    }}

                    containerStyle={{
                        width: widthPercentageToDP('50%'),
                        alignSelf: 'center',
                        marginTop: heightPercentageToDP('2%')

                    }}

                    titleStyle={{
                        fontSize: heightPercentageToDP('2%'),
                        color: 'white',
                        height: heightPercentageToDP('3%')
                    }}
                    onPress={() => {
                        this.checkServer()
                    }}
                />
            )
        case 1:
            return (
                <Button
                    title="ОK"
                    buttonStyle={{
                        backgroundColor: 'red'
                    }}

                    containerStyle={{
                        width: widthPercentageToDP('50%'),
                        alignSelf: 'center',
                        marginTop: heightPercentageToDP('2%')

                    }}

                    titleStyle={{
                        fontSize: heightPercentageToDP('2%'),
                        color: 'white',
                        height: heightPercentageToDP('3%')
                    }}
                    onPress={() => {
                         this.props.navigation.goBack(),
                            this.setState({ visiable: false })
                    }}
                />
            )
    }
}

render() {

    return (
        <View>
            <Dialog
                visible={this.state.visiable}
            >
                <DialogTitle
                    title="Проблема с подключением к серверу!"
                />
                <DialogContent>
                    <View >
                        {this.changeText()}
                    </View>
                    <View >
                        {this.changeButtom()}
                    </View>
                </DialogContent>
            </Dialog>
        </View>

    )
}
}


const styles = StyleSheet.create({
    dialogFutter: {
        width: widthPercentageToDP('70%'),
        alignSelf: 'center'
    },

    textConnection: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.2%'),
        color: 'green',
        marginTop: heightPercentageToDP('3%'),
        marginBottom: heightPercentageToDP('1%')
    },
    textNotConnection: {
        textAlign: 'center',
        fontSize: heightPercentageToDP('2.2%'),
        color: 'red',
        marginTop: heightPercentageToDP('3%'),
        marginBottom: heightPercentageToDP('1%')
    },

});

const mapStateToProps = state => {
    return {
        server: state.server,
        ipAddress: state.ipAddress
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkServerState: (ipAddress) => dispatch(checkServerState(ipAddress))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorConnectToServer); 
