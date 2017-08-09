import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { iconStyle, headerStyle, headerTitleStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';
import WorkoutIndex from './WorkoutIndex';
import BeginnerWorkout from './BeginnerWorkout';

class WorkoutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarIcon: ({ tintColor }) => (
      <MIcon name="dumbbell" color={tintColor} style={iconStyle} />
    )
  }

  render() {
    return (
      <WorkoutStackNav />
    );
  }
}


const WorkoutStackRoutes = {
  WorkoutIndex: { screen: WorkoutIndex },
  Beginner: { screen: BeginnerWorkout }
};

const WorkoutStackConfig = {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle
  }
}

const WorkoutStackNav = StackNavigator(WorkoutStackRoutes, WorkoutStackConfig);

export default WorkoutScreen;
