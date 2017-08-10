import React from 'react';
import { AppRegistry, Text, View, Keyboard, StatusBar } from 'react-native';
import Timer from './src/components/Timer';
import { TabNavigator } from 'react-navigation';

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

const routeConfiguration = {
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

const FooterTabs = TabNavigator(routeConfiguration, tabBarConfiguration);

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 20,
    justifyContent: 'space-between'
  }
};
