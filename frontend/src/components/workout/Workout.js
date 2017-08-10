import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard } from 'react-native';
import { textStyle, containerStyle, bandContainerStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import Picker from '../Picker';

class Workout extends React.Component {
  static navigationOptions = {
    title: 'Workout'
  };

  constructor(props) {
    super(props);
    this.state = {
      workoutType: this.props.navigation.state.params.workoutType,
      round: '00',
      timerVal: '00:00:00',
      exercises: ['test', 'test2', 'test3'],
      pickerValue: ''
    }

    this._startTimer = this._startTimer.bind(this);
  }

  _startTimer() {
    alert('hi');
    // this.setState({
    //   round: 2
    // })
  }

  _clearTimer() {

  }

  render() {
    const { workoutType } = this.props.navigation.state.params;
    let exerciseList = Array.from(this.state.exercises);
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View className="workout-box" style={formContainerStyle}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={subHeaderStyle}>
                  {workoutType.toUpperCase()}
                </Text>
                <TextInput
                  style={ {fontSize: 40, color: '#d3d3d3', width: 120, height: 40} }
                  placeholder='00'
                  value={`RD ${this.state.round}`}
                  editable={false}
                  />
              </View>

              <View className='timer-box' style={timerStyle}>
                <TextInput
                  style={ {fontSize: 70, width: '100%', color: '#d3d3d3', textAlign: 'center'} }
                  placeholder="00:00:00"
                  value={this.state.timerVal}
                  editable={false}
                  />
              </View>

              <View className='movement-list-box' style={bandContainerStyle}>
                <Text>Exercise 1</Text>
                <Text>
                  {this.state.exercises.map( (el, i) => (
                    <Text key={i}>{`${el}\n`}</Text>
                  ))}
                </Text>
                  <Picker
                    renderPicker={() => (
                      <Text style={{ color: '#fff', textAlign: 'center' }}>
                        Current Value: {this.state.pickerValue}
                      </Text>
                     )}
                     selectedValue={this.state.pickerValue}
                     onValueChange={ pickerValue => this.setState({ pickerValue }) }
                  >
                    {this.state.exercises.map( (el, i) => (
                      <Picker.Item
                        key={i}
                        label={el}
                        value={el}
                       />
                    ))}
                  </Picker>

                <Text>Exercise 2</Text>

              </View>
              <Text>
              {'\n'}
              {'\n'}
              {'\n'}
              {'\n'}
              </Text>
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 30})}
                onPress={this._startTimer}
                >
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
  backgroundColor: '#f0f0f0',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#e6e6e6'
}


export default Workout;
