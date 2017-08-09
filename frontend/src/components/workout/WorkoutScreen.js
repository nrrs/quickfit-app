import React from 'react';
import { Text, View, TouchableOpacity,TouchableHighlight } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { textStyle, iconStyle, bandContainerStyle, bandStyle } from '../../styles/styles';


class WorkoutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarIcon: ({ tintColor }) => (
      <MIcon name="dumbbell" color={tintColor} style={iconStyle} />
    )
  }

  render() {
    return (
      <View className="workout-options" style={bandContainerStyle}>
        <TouchableOpacity style={customBandStyle}>
          <Text style={bandTextStyle}>custom</Text>
        </TouchableOpacity>
        <TouchableOpacity style={beginnerBandStyle}>
          <Text style={bandTextStyle}>beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={moderateBandStyle}>
          <Text style={bandTextStyle}>moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={advanceBandStyle}>
          <Text style={bandTextStyle}>advance</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const bandTextStyle = {
  color: '#fff',
  fontSize: 32
}
const customBandStyle = Object.assign({}, bandStyle, {
  backgroundColor: '#6ACDFA'
});
const beginnerBandStyle = Object.assign({}, bandStyle, {
  backgroundColor: '#4cd964'
});
const moderateBandStyle = Object.assign({}, bandStyle, {
  backgroundColor: '#ffcc00'
});
const advanceBandStyle = Object.assign({}, bandStyle, {
  backgroundColor: '#ff9500'
});


export default WorkoutScreen;
