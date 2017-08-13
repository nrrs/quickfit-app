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
  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle = 'dark-content' />
        <FooterTabs />
      </View>
    );
  }
}

const tabRoutes = {
  profile: { screen: ProfileScreen },
  workout: { screen: WorkoutScreen },
  create: { screen: CreateScreen }
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

const FooterTabs = TabNavigator(tabRoutes, tabBarConfiguration);

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 20,
    justifyContent: 'space-between'
  }
};

// set up axios defualts
axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + configs.appToken;
