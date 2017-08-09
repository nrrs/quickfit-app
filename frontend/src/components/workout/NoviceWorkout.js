import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

class NoviceWorkout extends React.Component {
  static navigationOptions = {
    title: 'Novice',
  };

  render() {
    return (
      <View className="novice-workout" style={containerStyle}>
        <Text>Novice Workout</Text>
      </View>
    );
  }
}

export default NoviceWorkout;
