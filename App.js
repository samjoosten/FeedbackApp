import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FeedbackScreen from './components/FeedbackScreen'

class HomeScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Text>Ik verbouw deze file voor GIT</Text>
                <Button
                    title="Feedback"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
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
