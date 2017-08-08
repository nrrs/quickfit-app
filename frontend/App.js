import React from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Timer from './src/components/Timer';
import { TabNavigator } from 'react-navigation';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';

import ProfileScreen from './src/components/profile/ProfileScreen';
import WorkoutScreen from './src/components/workout/WorkoutScreen';
import CreateScreen from './src/components/create_workout/CreateScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
}

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
}

const FooterTabs = TabNavigator(routeConfiguration, tabBarConfiguration);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 25
  },
  formWrapper: {
    width: 300,
    marginLeft: 20
  }
});
