import React from 'react';
import { Text, View, Keyboard } from 'react-native';
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
      <View style={styles.containerStyle}>
        <Header title={"QuickFit"}/>
        <FooterTabs />
      </View>
    );
  }
}

const routeConfiguration = {
  Profile: { screen: ProfileScreen },
  Workout: { screen: WorkoutScreen },
  Add: { screen: CreateScreen }
};

const tabBarConfiguration = {
  tabBarOptions: {
		activeTintColor: 'green',
		inactiveTintColor: '#ccc',
		labelStyle: {
			fontSize: 10
		},
		style: {
			backgroundColor: 'white',
			borderTopWidth: 1,
			borderTopColor: '#ccc',
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
