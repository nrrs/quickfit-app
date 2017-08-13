import React from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Vibration,
  Modal } from 'react-native';
import { textStyle, bandContainerStyle, subHeaderStyle, cardStyle } from '../../styles/styles';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import ModalPicker from 'react-native-modal-picker';
import axios from 'axios';
import * as WOD from './DefaultWorkout';
import { shuffle, values, flatten } from 'lodash';
import Loading from '../Loading';


const flashShow = 750;
const flashHide = 1750;

let index = 0;
let tempData = WOD.novice;

let novice = flatten(values(WOD.novice)).map(movement => {
  return ({ key: index++, label: movement[0], description: movement[1] })
});
novice = [{ key: index++, section: true, label: 'Novice' }].concat(novice);

let moderate = flatten(values(WOD.moderate)).map(movement => {
  return ({ key: index++, label: movement[0], description: movement[1] })
});
moderate = [{ key: index++, section: true, label: 'Moderate' }].concat(moderate);

let advanced = flatten(values(WOD.advanced)).map(movement => {
  return ({ key: index++, label: movement[0], description: movement[1] })
});
advanced = [{ key: index++, section: true, label: 'Advanced' }].concat(advanced);

let data = [
  { key: index++, section: true, label: 'Rest' },
    { key: index++, label: 'Rest' },
  ].concat(novice).concat(moderate).concat(advanced);

class Workout extends React.Component {
  static navigationOptions = {
    title: 'Workout'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      editable: true,
      workoutType: this.props.navigation.state.params.workoutType,
      round: null,
      exercises: [],
      timerDisplay: '',
      duration: null,
      paused: true,
      pauseTime: 0,
      modalVisible: false,
      modalBg: 'rgba(76, 217, 100, 1)',
      cue: '',
      workoutDone: false,
      postNotes: null
    }

    this.currentExerciseArray = [];
    this.timer = null;

    this.ready = this.ready.bind(this);
    this.selectExercises = this.selectExercises.bind(this);
    this.displayExercises = this.displayExercises.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.totalDuration = this.totalDuration.bind(this);
    this.pause = this.pause.bind(this);
    this.prettifyDuration = this.prettifyDuration.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.flashGo = this.flashGo.bind(this);
    this.flash = this.flash.bind(this);
    this.buildWorkout = this.buildWorkout.bind(this);
    this.saveWorkout = this.saveWorkout.bind(this);
  }

  componentWillMount() {
    switch (this.state.workoutType) {
      case "novice":
        this.buildWorkout("novice");
        this.setState({ loading: false });
        break;
      case "moderate":
        this.buildWorkout("moderate");
        this.setState({ loading: false });
        break;
      case "advanced":
        this.buildWorkout("advanced");
        this.setState({ loading: false });
        break;
      default:
        axios.get('http://afternoon-bastion-37946.herokuapp.com/api/movements/')
        .then( res => {
          this.setState({ loading: false });
          console.log(res);
        })
        .catch( error => {
          console.log(error);
        });
    }

  }

  componentWillUnmount() {
    this.clearTimer(this.timer);
    this.setState({
      editable: true,
      workoutType: this.props.navigation.state.params.workoutType,
      round: 1,
      roundDisplay: '',
      exercises: [],
      timerDisplay: '',
      duration: null,
      durationForRounds: null,
      paused: false,
      pauseTime: 0,
      modalVisible: false
    })
  }

  _updateText(field) {
    return (val) => {
      let num = parseInt(val);
      switch (field) {
        case "time":
          this.setState({
            timerDisplay: val
          });
          break;
        case "postNotes":
          this.setState({
            [field]: val
          });
          break;
        default:
          this.setState({
            [field]: num
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

  setTimer() {
    const { totalDuration } = this.state;

    this.timer = setInterval( () => {
      let duration = this.state.duration;
      duration -= 1000; // decrement by second

      if (this.state.duration < 1000) { // When timer is done...
        this.clearTimer(this.timer);  // clear current timer

        if (this.state.round <= 1) { // check rounds
          this.flash('DONE!', 'rgba(255, 59, 48, 1)');
          Vibration.vibrate([0, 500, 500, 500], false);
          setTimeout(() => { this.setState({
            workoutDone: true,
            roundDisplay: '0',
          }); }, flashHide);
        } else {
          this.setState({
            duration: totalDuration,
            round: this.state.round - 1,
            roundDisplay: `${this.state.round - 1}`,
            timerDisplay: this.prettifyDuration(totalDuration / 1000)
          });

          this.setTimer();
        }
      } else {
        let timerDisplay = this.prettifyDuration(duration / 1000); // Prettify time display by converting millisecond to seconds base.
        this.setState({
          duration,
          timerDisplay,
        });
      }
    }, 1000 );
  }

  clearTimer(timer) {
    clearInterval(timer);
  }

  buildWorkout(difficulty) {
    let exerciseOne = shuffle(WOD[`${difficulty}`]['upperBody'])[0];
    let exerciseTwo = shuffle(WOD[`${difficulty}`]['lowerBody'])[0];
    let exerciseThree = shuffle(WOD[`${difficulty}`]['fullBody'])[0];
    let exerciseFour = shuffle(WOD[`${difficulty}`]['core'])[0];
    let randomExercises = [
      { label: exerciseOne[0], description: exerciseOne[1] },
      { label: exerciseTwo[0], description: exerciseTwo[1] },
      { label: exerciseThree[0], description: exerciseThree[1] },
      { label: exerciseFour[0], description: exerciseFour[1] },
    ]
    this.setState ({
      editable: false,
      round: 0,
      exercises: randomExercises,
      timerDisplay: '00:10:00',
      duration: 600000,
    });
  }

  ready(exerciseArray) {
    if (this.state.timerDisplay === '') {
      alert('Timer cannot be empty!');
      return;
    }

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
    const durationForRounds = this.totalDuration(hour, min, sec);

    this.setState({
      editable: false,
      exercises: exerciseArray,
      timerDisplay,
      duration,
      totalDuration: durationForRounds
    });
  }

  flashGo() {
    if (this.state.paused === false) {
      return null;
    }
    this.setState({ modalVisible: true, cue: '3' });
    setTimeout( () => { this.setState({ cue: '2' }); }, 1000);
    setTimeout( () => { this.setState({ cue: '1' }); }, 2000);
    setTimeout( () => { this.setState({ cue: 'GO!' }); }, 3000);
    setTimeout( () => { this.setState({ modalVisible: false, paused: false }); this.setTimer(); }, 3500);
  }

  flash(message, bgColor) {
    setTimeout( () => {
      this.setState({
        modalVisible: true,
        modalBg: bgColor,
        cue: `${message}`
      });
    }, flashShow);
    setTimeout( () => {
      this.setState({ modalVisible: false });
    }, flashHide);
  }

  pause() {
    this.setState({
      paused: true,
      pauseTime: this.state.duration
    });
    this.clearTimer(this.timer);
  }

  selectExercises() {
    let { exercises } = this.state;

    return (
      <View>
        <Text style={subHeaderStyle}>SELECT MOVEMENTS</Text>
        <ModalPicker
          data={data}
          initValue="Movement 1"
          style={{ borderRadius: 0, padding: 10 }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={data}
          initValue="Movement 2"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={data}
          initValue="Movement 3"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

        <ModalPicker
          data={data}
          initValue="Movement 4"
          style={{ borderRadius: 0, padding: 10  }}
          onChange={ option => {
            this.currentExerciseArray.push(option);
          }}
        />

      </View>
    );
  }

  displayExercises() {
    if (this.state.editable) { return this.selectExercises(); }
    return (
        <View>
          { this.state.exercises.map( (el, i) => (
            <View key={i} style={cardStyle}>
              <Text style={textStyle}>
                {el.label}{'\n'}
                <Text style={{display: 'none'}}>{el.description}</Text>
              </Text>
            </View>
            ))
          }
        </View>
    );
  }

  renderButton() {
    if (this.state.editable) { return (
      <TouchableOpacity
        style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
        onPress={ () => this.ready(this.currentExerciseArray) }>
        <Text style={ buttonTextStyle }>Next</Text>
      </TouchableOpacity>
    ); }

    if (this.state.workoutDone) { return null };

    return (
      <View>
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
          onPress={ () => this.flashGo()}>
          <Text style={ Object.assign({}, buttonTextStyle, {color: '#4cd964'}) }>START!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
          onPress={ () => this.pause()}>
          <Text style={ Object.assign({}, buttonTextStyle, {color: '#ff9500'}) }>PAUSE!</Text>
        </TouchableOpacity>
      </View>
    );

  }

  flashModal() {
    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.modalVisible}
        presentationStyle={'overFullScreen'}
        >
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.modalBg }}>
          <Text style={{ color: '#fff', fontSize: 90 }}>{this.state.cue}</Text>
        </View>
      </Modal>
    );
  }

  saveWorkout() {
    const newWorkout = {
      athlete_id: 2,
      workout_data: {
        post_workout_notes: this.state.postNotes,
        workout_type: this.state.workoutType,
        movements: this.state.exercises.map((exerciseObj) => {
          return exerciseObj["label"]
        })
      }
    }
    axios.post('https://afternoon-bastion-37946.herokuapp.com/api/workouts/', newWorkout)
    .then( res => {
      alert("success!");
      console.log(newWorkout);
    })
    .catch( error => console.log(newWorkout))
  }

  render() {
    const { workoutType } = this.props.navigation.state.params;

    const notes = (this.state.workoutDone) ? (
      <View>
        <Text style={subHeaderStyle}> NOTES </Text>
        <TextInput
          id="description"
          style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
          placeholder="Add a post workout note"
          multiline={true}
          onChangeText={this._updateText("postNotes")}
        />
        <TouchableOpacity
          style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
          onPress={this.saveWorkout}>
          <Text style={ buttonTextStyle }>Save Workout</Text>
        </TouchableOpacity>
      </View>
    ) : null;

    if (this.state.loading) return (<Loading />);

    return (
      <View style={{ flex: 1 }}>
        { this.flashModal() }
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="workout-box" style={formContainerStyle}>
            <ScrollView
              style={{flex:1}}
              stickyHeaderIndices={[0]}
              >
              <View className="header-container">
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 10,
                  backgroundColor: '#fafafa'
                }}>
                  <Text style={subHeaderStyle}>{workoutType.toUpperCase()}</Text>
                  <View className="round-box" style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={ {fontSize: 40, color: '#d3d3d3'} }>RD: </Text>
                    <TextInput
                      id="round"
                      style={ {fontSize: 40, color: '#d3d3d3', textAlign: 'right'} }
                      placeholder='00'
                      editable={this.state.editable}
                      keyboardType='numeric'
                      onChangeText={this._updateText("round")}
                      value={this.state.roundDisplay}
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
              </View>
              <TouchableWithoutFeedback>
                <View className='movement-list-box' style={bandContainerStyle}>
                  { this.displayExercises() }
                  { this.renderButton() }
                  { notes }
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
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
  color: '#7e7e7e', //#d3d3d3
  textAlign: 'right',
  width: '100%',
  margin: 0,
  padding: 0,
}

export default Workout;
