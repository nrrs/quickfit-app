import React from 'react';
import { Text, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, bandContainerStyle, bandStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';
import NoviceWorkout from './NoviceWorkout';
import ModerateWorkout from './ModerateWorkout';
import AdvancedWorkout from './AdvancedWorkout';
import CustomWorkout from './CustomWorkout';

class WorkoutIndex extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Workout',
    tabBarIcon: ({ tintColor }) => (
      <MIcon name="dumbbell" color={tintColor} style={iconStyle} />
    ),
    title: "QuickFit"
  }

  render() {
    return (
      <View className="workout-options" style={bandContainerStyle}>
        <View style={Object.assign({}, containerStyle, {backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#e6e6e6'})}>
          <Text style={Object.assign({}, textStyle, {color: '#262626', textAlign: 'center'})}>
            Welcome!{'\n'}
            QuickFit was designed to provide you a quick and engaging workout!{'\n'}
            From beginner to advanced, tap one that works for you or customize your own!
          </Text>
        </View>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle)}
          onPress={() => { this.props.navigation.navigate('novice');}}
          title="Novice Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#4cd964'})}>NOVICE</Text>
          <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#4cd964'})} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle)}
          onPress={() => { this.props.navigation.navigate('moderate');}}
          title="Moderate Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#ff9500'})}>MODERATE</Text>
          <View style={{flexDirection: 'row'}}>
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff9500'})} />
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff9500'})} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle)}
          onPress={() => { this.props.navigation.navigate('advanced');}}
          title="Advanced Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#ff3b30'})}>ADVANCED</Text>
          <View style={{flexDirection: 'row'}}>
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff3b30'})} />
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff3b30'})} />
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff3b30'})} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle)}
          onPress={() => { this.props.navigation.navigate('custom');}}
          title="Custom Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#6ACDFA'})}>CUSTOM</Text>
          <FIcon name="star" style={Object.assign({}, dropStyle, {color: '#6ACDFA'})} />
        </TouchableOpacity>

      </View>
    );
  }
}

const dropStyle = {
  color: '#e6e6e6',
  fontSize: 30,
  marginTop: 10,
  marginRight: 5
}

const bandTextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  padding: 10,
  marginTop: 10,
  color: '#fff'
}

export default WorkoutIndex;
