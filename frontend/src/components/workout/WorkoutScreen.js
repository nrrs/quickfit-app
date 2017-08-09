import React from 'react';
import { Text } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class WorkoutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarIcon: ({ tintColor }) => (
      <MIcon name="dumbbell" color={tintColor} style={styles.textStyle} />
    )
  }
  render() {
    return (
      <Text> Workout Generator </Text>
    )
  }
}


export default WorkoutScreen;

const styles = {
  textStyle: {
    fontSize: 25
  }
};
