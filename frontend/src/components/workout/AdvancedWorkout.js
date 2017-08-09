import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

class AdvancedWorkout extends React.Component {
  static navigationOptions = {
    title: 'Advanced',
  };

  render() {
    return (
      <View className="advanced-workout" style={containerStyle}>
        <Text>Moderate Workout</Text>
      </View>
    );
  }
}

export default AdvancedWorkout;
