import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

class BeginnerWorkout extends React.Component {
  static navigationOptions = {
    title: 'Beginner Workout',
  };

  render() {
    return (
      <View className="beginner-workout" style={containerStyle}>
        <Text>Beginner Workout HERE!</Text>
      </View>
    );
  }
}

export default BeginnerWorkout;
