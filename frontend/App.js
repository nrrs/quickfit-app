import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Timer from './src/components/Timer';
import { TabNavigator } from 'react-navigation';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';

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

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <FIcon name="user-circle-o" color={tintColor} style={styles.textStyle}/>
        </Text>
    )
  }
  render() {
    return (
      <Text> Profile Page </Text>
    )
  }
}

class WorkoutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <MIcon name="dumbbell" color={tintColor} style={styles.textStyle} />
        </Text>
    )
  }
  render() {
    return (
      <Text> Workout Generator </Text>
    )
  }
}

class AddScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add Movement',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <IIcon name="md-add-circle" color={tintColor} style={styles.textStyle} />
        </Text>

    )
  }
  render() {
    return (
      <Text> Add Exercise </Text>
    )
  }
}

const routeConfiguration = {
  Profile: { screen: ProfileScreen},
  Workout: { screen: WorkoutScreen},
  Add: { screen: AddScreen}
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
  }
});
