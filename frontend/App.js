import React from 'react';
import { AppRegistry, Text, View, Keyboard, StatusBar } from 'react-native';
import Timer from './src/components/Timer';
import { configs } from './src/config/config';
import { TabNavigator } from 'react-navigation';
import axios from 'axios';

import ProfileScreen from './src/components/profile/ProfileScreen';
import WorkoutScreen from './src/components/workout/WorkoutScreen';
import CreateScreen from './src/components/create_workout/CreateScreen';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        this.renderNav = this.renderNav.bind(this);
    }

    renderNav() {
        if (this.state.loggedIn) {
            return <LoggedInFooterTabs screenProps = { this }
            />
        } else {
            return <LoggedOutFooterTabs screenProps = { this }
            />
        }

    }

    render() {
        return ( <
            View style = { styles.containerStyle } >
            <StatusBar barStyle = 'dark-content' / >{ this.renderNav() }</View>
        );
    }
}

const loggedInTabRoutes = {
    workout: { screen: WorkoutScreen },
    profile: { screen: ProfileScreen },
    create: { screen: CreateScreen }
};

const loggedOutTabRoutes = {
    workout: { screen: WorkoutScreen },
    login: { screen: ProfileScreen }
};

const tabBarConfiguration = {
    tabBarOptions: {
        activeTintColor: '#646464',
        inactiveTintColor: '#ccc',
        labelStyle: {
            fontSize: 12,
            marginBottom: 5
        },
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e6e6e6',
            height: 50
        }
    }
};

const LoggedInFooterTabs = TabNavigator(loggedInTabRoutes, tabBarConfiguration);
const LoggedOutFooterTabs = TabNavigator(loggedOutTabRoutes, tabBarConfiguration);

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fafafa',
        marginTop: 20,
        justifyContent: 'space-between'
    }
};

// set up axios defualts
axios.defaults.baseURL = 'https://quick-fit.herokuapp.com/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + configs.appToken;

console.disableYellowBox = true;
