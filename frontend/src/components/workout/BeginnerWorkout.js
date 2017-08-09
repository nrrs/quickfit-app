import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import { textStyle, iconStyle, bandContainerStyle, bandStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';



class BeginnerWorkout extends React.Component {
  render() {
    return (
      <View className="beginner-workout" style={containerStyle}>
        <Text>Beginner Workout HERE!</Text>
      </View>
    );
  }
}

export default BeginnerWorkout;
