import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard } from 'react-native';
import { textStyle, containerStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';

class Workout extends React.Component {
  static navigationOptions = {
    title: 'Workout'
  };

  constructor(props) {
    super(props);
    this.state = {
      workoutType: this.props.navigation.state.params.workoutType,
      round: '00',
      timerVal: '00:00:00'
    }
  }

  _startTimer() {

  }

  _clearTimer() {

  }

  render() {
    const { workoutType } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View className="workout-box" style={formContainerStyle}>
              <Text style={subHeaderStyle}>
                {workoutType.toUpperCase()}
              </Text>
              <View className='timer-box' style={timerStyle}>
                <TextInput
                  style={ {fontSize: 47, color: '#d3d3d3', paddingRight:10, marginRight: 10, borderRightWidth: 2, borderColor: '#d3d3d3'} }
                  placeholder='00'
                  value={this.state.round}
                  editable={false}
                  />
                <TextInput
                  style={ {fontSize: 47, width: '100%', color: '#d3d3d3'} }
                  placeholder="00:00:00"
                  value={this.state.timerVal}
                  editable={false}
                  />
              </View>
              <TouchableOpacity style={Object.assign({}, buttonStyle, {marginTop: 30})}>
                <Text style={{color: '#4cd964', fontSize: 20, fontWeight: 'bold'}}>GO!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const timerStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: 10,
  backgroundColor: '#f0f0f0',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#e6e6e6',
  justifyContent: 'space-between'
}


export default Workout;
