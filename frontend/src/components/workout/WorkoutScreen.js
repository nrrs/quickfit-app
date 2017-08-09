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
  novice: { screen: NoviceWorkout },
  moderate: { screen: ModerateWorkout },
  advanced: { screen: AdvancedWorkout },
  custom: { screen: CustomWorkout },
};

const workoutStackConfig = {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: stackHeaderStyle,
    headerTitleStyle: headerTitleStyle,
    headerBackTitle: ' ',
    shadowHidden: true
  }
}

const WorkoutStackNav = StackNavigator(workoutStackRoutes, workoutStackConfig);

export default WorkoutScreen;
