import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { iconStyle, stackHeaderStyle, headerTitleStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';
import WorkoutIndex from './WorkoutIndex';
import NoviceWorkout from './NoviceWorkout';
import ModerateWorkout from './ModerateWorkout';
import AdvancedWorkout from './AdvancedWorkout';
import CustomWorkout from './CustomWorkout';
import Workout from './Workout';

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


const workoutStackRoutes = {
  workoutIndex: { screen: WorkoutIndex },
  workout: { screen: Workout }
};

const workoutStackConfig = {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: stackHeaderStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitle: ' ',
    shadowHidden: true
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
}

const WorkoutStackNav = StackNavigator(workoutStackRoutes, workoutStackConfig);

export default WorkoutScreen;
