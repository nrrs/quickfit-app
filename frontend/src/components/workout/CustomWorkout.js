import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

class CustomWorkout extends React.Component {
  static navigationOptions = {
    title: 'Custom',
  };

  render() {
    return (
      <View className="custom-workout" style={containerStyle}>
        <Text>Custom Workout</Text>
      </View>
    );
  }
}

export default CustomWorkout;
