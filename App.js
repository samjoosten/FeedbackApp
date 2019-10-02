import * as React from 'react';
import {View, Text, Button, StyleSheet, TouchableHighlight, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FeedbackScreen from './components/FeedbackScreen'

class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        app: 'NPO start'
                                    })}>
                    <Image style={styles.logoImg} source={require('./npo_start_logo.jpeg')}/>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Details', {
                                        app: 'ZiggoeGo'
                                    })}>
                    <Image style={styles.logoImg} source={require('./ziggogo_logo.jpeg')}/>
                </TouchableHighlight>
            </View>
        );
    }
}



const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Details: FeedbackScreen,
    },
    {
        initialRouteName: 'Home',
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ecf0f1'
    },
    button: {
        margin: 10,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
    logoImg: {
        width: 170,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden'
    }
})
