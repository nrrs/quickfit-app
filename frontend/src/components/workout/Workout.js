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
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import ModalPicker from 'react-native-modal-picker';

class Workout extends React.Component {
  static navigationOptions = {
    title: 'Workout'
  };

  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      workoutType: this.props.navigation.state.params.workoutType,
      round: null,
      exercises: [],
      timerDisplay: '',
      duration: null,
      paused: false,
      pauseTime: 0
    }

    this.currentExerciseArray = [];
    this.data = [];
    this.timer = null;

    this.go = this.go.bind(this);
    this.ready = this.ready.bind(this);
    this.selectExercises = this.selectExercises.bind(this);
    this.displayExercises = this.displayExercises.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.totalDuration = this.totalDuration.bind(this);
    this.pause = this.pause.bind(this);
    this.prettifyDuration = this.prettifyDuration.bind(this);
  }

  componentWillMount() {
    let index = 0;
    this.data = [
      { key: index++, label: 'Rest' },
      { key: index++, section: true, label: 'Your Movements' },
      { key: index++, label: 'Custom Exercise 1', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Custom Exercise 2', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Custom Exercise 3', description: 'This is a description that was parsed from our backend database' },
      { key: index++, section: true, label: 'Novice' },
      { key: index++, label: 'Easy Exercise 1', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Easy Exercise 2', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Easy Exercise 3', description: 'This is a description that was parsed from our backend database' },
      { key: index++, section: true, label: 'Moderate' },
      { key: index++, label: 'Medium Exercise 1', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Medium Exercise 2', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Medium Exercise 3', description: 'This is a description that was parsed from our backend database' },
      { key: index++, section: true, label: 'Advanced' },
      { key: index++, label: 'Hard Exercise 1', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Hard Exercise 2', description: 'This is a description that was parsed from our backend database' },
      { key: index++, label: 'Hard Exercise 3', description: 'This is a description that was parsed from our backend database' },
    ];
  }


  componentWillUnmount() {
    this.clearTimer(this.timer);
    this.setState({
      editable: true,
      workoutType: this.props.navigation.state.params.workoutType,
      round: null,
      exercises: [],
      timerDisplay: '',
      duration: null,
      paused: false,
      pauseTime: 0
    })
  }

  _updateText(field) {
    return (val) => {
      let num = parseInt(val);
      this.setState({
        [field]: num
      });
      if (field === "time") {
        let displayVal = val;
        this.setState({
          timerDisplay: `${displayVal}`
        });
      }
    }
  }

  prettifyDuration(duration) { // duration is coming is seconds
    let parsedDuration = parseInt(duration); // for safety
    let hour = 0, min = 0, sec = 0;

    while (parsedDuration >= 3600) {
      hour += 1;
      parsedDuration -= 3600;
    }
    while (parsedDuration >= 60) {
      min += 1;
      parsedDuration -= 60;
    }
    sec = parsedDuration;

    return this.formatTime(hour, min, sec);
  }

  formatTime(hr, min, sec) {
    if (sec < 10) { sec = `0${sec}` }
    if (min < 10) { min = `0${min}` }
    if (hr < 10) { hr = `0${hr}` }
    return `${hr}:${min}:${sec}`;
  }

  totalDuration(hour, min, sec) {
    return ((sec * 1000) + (min * 60000) + (hour * 3600000));
  }

  clearTimer(timer) {
    clearInterval(timer);
  }

  ready(exerciseArray) {
    const userInputDuration = parseInt(this.state.timerDisplay);
    let hour = 0, min = 0, sec = 0;

    // Parse string input into correct timing units based on seconds
    hour = parseInt(userInputDuration / 10000) % 100;
    min = parseInt(userInputDuration / 100) % 100;
    sec = parseInt(userInputDuration % 100);

    // Cover edge case for formatting (65 secs => 1:05)
    if (min > 59) { min -= 60; hour += 1; }
    if (sec > 59) { sec -= 60; min += 1; }

    const timerDisplay = this.formatTime(hour, min, sec);
    const duration = this.totalDuration(hour, min, sec);


    this.setState({
      editable: false,
      exercises: exerciseArray,
      timerDisplay,
      duration
    });
  }

  go() {
    this.timer = setInterval( () => {
      let duration = this.state.duration;

      // decrement by second
      duration -= 1000;

      // if duration <= 1 sec, clear timer.
      if (this.state.duration <= 1000) { this.clearTimer(this.timer); }

      // Prettify time display by converting millisecond to seconds base.
      let timerDisplay = this.prettifyDuration(duration / 1000);

      this.setState({
        duration,
        timerDisplay,
      })
    }, 1000 );
  }

  pause() {
    this.setState({
      paused: true,
      pauseTime: this.state.duration
    });
    this.clearTimer(this.timer);
  }

  displayExercises() {
    if (this.state.editable) { return this.selectExercises(); }
    return (
        <View>
          { this.state.exercises.map( (el, i) => (
            <View key={i} style={buttonStyle}>
              <Text style={textStyle}>
                {el.label}{'\n'}
                {el.description}
              </Text>
            </View>
            ))
          }
        </View>
    );
  }

  selectExercises() {
    let { exercises } = this.state;

    return (
      <View>
        <Text style={subHeaderStyle}>Select Movements</Text>
        <ModalPicker
          data={this.data}
          initValue="Movement 1"
          style={{ borderRadius: 0, padding: 10 }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={this.data}
          initValue="Movement 2"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={this.data}
          initValue="Movement 3"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={this.data}
          initValue="Movement 4"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

      </View>
    );
  }

  renderButton() {
    if (this.state.editable) { return (
      <TouchableOpacity
        style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
        onPress={ () => this.ready(this.currentExerciseArray) }>
        <Text style={ Object.assign({}, buttonTextStyle, {color: '#ff3b30'}) }>READY?</Text>
      </TouchableOpacity>
    ); }

    return (
      <View>
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
          onPress={ () => this.go()}>
          <Text style={ Object.assign({}, buttonTextStyle, {color: '#4cd964'}) }>GO!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
          onPress={ () => this.pause()}>
          <Text style={ Object.assign({}, buttonTextStyle, {color: '#ff9500'}) }>PAUSE!</Text>
        </TouchableOpacity>
      </View>
    );

  }

  render() {
    const { workoutType } = this.props.navigation.state.params;
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="workout-box" style={formContainerStyle}>
              <View className="header-container"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 10
                }}>
                <Text style={subHeaderStyle}>
                  {workoutType.toUpperCase()}
                </Text>
                <View className="round-box" style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={ {fontSize: 40, color: '#d3d3d3'} }>RD: </Text>
                  <TextInput
                    id="round"
                    style={ {fontSize: 40, color: '#d3d3d3', textAlign: 'right'} }
                    placeholder='00'
                    editable={this.state.editable}
                    keyboardType='numeric'
                    onChangeText={this._updateText("round")}
                    maxLength={2}
                    />
                </View>
              </View>

              <View className='timer-box' style={timerStyle}>

                <TextInput
                  id="time"
                  style={timerTextStyle}
                  placeholder="00:00:00"
                  editable={this.state.editable}
                  keyboardType='number-pad'
                  onChangeText={this._updateText("time")}
                  value={this.state.timerDisplay}
                  maxLength={6}
                  />

              </View>


              <View className='movement-list-box' style={bandContainerStyle}>
                <ScrollView style={{flex:1}}>
                  { this.displayExercises() }
                  { this.renderButton() }
                </ScrollView>
              </View>
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const timerStyle = {
  backgroundColor: '#f0f0f0',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#e6e6e6',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingLeft: 10,
  paddingRight: 10
}

const timerTextStyle = {
  fontSize: 75,
  color: '#d3d3d3',
  textAlign: 'right',
  width: '100%',
  margin: 0,
  padding: 0,
}

export default Workout;
