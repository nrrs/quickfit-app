import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

class ModerateWorkout extends React.Component {
  static navigationOptions = {
    title: 'Moderate',
  };

  render() {
    return (
      <View className="moderate-workout" style={containerStyle}>
        <Text>Moderate Workout</Text>
      </View>
    );
  }
}

export default ModerateWorkout;
