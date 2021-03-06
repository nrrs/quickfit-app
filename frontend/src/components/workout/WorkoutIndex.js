import React from 'react';
import { Text, ScrollView, View, TouchableOpacity,TouchableNativeFeedback } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, subHeaderStyle, bandContainerStyle, bandStyle, containerStyle } from '../../styles/styles';
import { buttonStyle } from '../../styles/forms';

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
      <ScrollView className="workout-options" style={bandContainerStyle}>
        <View style={Object.assign({}, containerStyle, {backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#e6e6e6'})}>
          <Text style={Object.assign({}, subHeaderStyle, {textAlign: 'center'})}>
            Tap a level for a workout!{`\n`} or create your own!
          </Text>
        </View>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle, {shadowOpacity: 1,
          shadowColor: '#e6e6e6', marginTop: 15})}
          onPress={() => { this.props.navigation.navigate('workout', {workoutType: 'novice'});}}
          title="Novice Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#4cd964'})}>NOVICE</Text>
          <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#4cd964'})} />
        </TouchableOpacity>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle, {shadowOpacity: 1,
          shadowColor: '#e6e6e6'})}
          onPress={() => { this.props.navigation.navigate('workout', {workoutType: 'moderate'});}}
          title="Moderate Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#ff9500'})}>MODERATE</Text>
          <View style={{flexDirection: 'row'}}>
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff9500'})} />
            <FIcon name="tint" style={Object.assign({}, dropStyle, {color: '#ff9500'})} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, bandStyle, {shadowOpacity: 1,
          shadowColor: '#e6e6e6'})}
          onPress={() => { this.props.navigation.navigate('workout', {workoutType: 'advanced'});}}
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
          style={Object.assign({}, buttonStyle, bandStyle, {shadowOpacity: 1,
          shadowColor: '#e6e6e6'})}
          onPress={() => { this.props.navigation.navigate('workout', {workoutType: 'custom'});}}
          title="Custom Workout"
          >
          <Text style={Object.assign({}, bandTextStyle, {color: '#6ACDFA'})}>CUSTOM</Text>
          <FIcon name="star" style={Object.assign({}, dropStyle, {color: '#6ACDFA'})} />
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={{textAlign: 'center', width: '75%'}}>By using this app, you agree to the terms and services outlined here.</Text>
        </View>
        <Text>{"\n"}</Text>
      </ScrollView>
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
