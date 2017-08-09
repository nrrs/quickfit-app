import React from 'react';
import { Text, View, Keyboard, StatusBar } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Timer from './src/components/Timer';
import { TabNavigator } from 'react-navigation';

import ProfileScreen from './src/components/profile/ProfileScreen';
import WorkoutScreen from './src/components/workout/WorkoutScreen';
import CreateScreen from './src/components/create_workout/CreateScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle = 'dark-content'
          />
        <Header title={"QuickFit"}/>
        <FooterTabs />
      </View>
    );
  }
}

const routeConfiguration = {
  Profile: { screen: ProfileScreen},
  Workout: { screen: WorkoutScreen},
  Add: { screen: CreateScreen}
};

const tabBarConfiguration = {
  tabBarOptions: {
		activeTintColor: '#262626',
		inactiveTintColor: '#ccc',
		labelStyle: {
			fontSize: 15,
      marginBottom: 5
		},
		style: {
			backgroundColor: '#fff',
			borderTopWidth: 1,
			borderTopColor: '#ccc',
      height: 60
    }
	}
};

const FooterTabs = TabNavigator(routeConfiguration, tabBarConfiguration);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 20,
    justifyContent: 'space-between'
  }
};
