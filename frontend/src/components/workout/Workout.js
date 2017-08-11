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
      time: null,
      exercises: [],
      timerDisplay: ''
    }

    this.currentExerciseArray = [];
    this.data = [];

    this.go = this.go.bind(this);
    this.ready = this.ready.bind(this);
    this.selectExercises = this.selectExercises.bind(this);
    this.displayExercises = this.displayExercises.bind(this);
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

  _updateText(field) {
    return (val) => {
      let num = parseInt(val);
      this.setState({
        [field]: num
      });
      if (field === "time") {
        let displayVal = val;
        // // let noColons = newVal.replace(/:/, '')
        // let test = moment(val, "HHmmss");
        //
        // console.log(test);
        // switch (displayVal.length ) {
        //   case 2:
        //   case 5:
        //     displayVal += ":"
        //     break;
        //   default:
        // };

        this.setState({
          timerDisplay: `${displayVal}`
        });
      }
    }
  }

  ready(exerciseArray) {

    let duration = parseInt(this.state.timerDisplay);
    console.log(duration);

    let hour = 0;
    let min = 0;
    let sec = 0;

    sec = parseInt(duration % 100);
    min = parseInt(duration / 100) % 100;
    hour = parseInt(duration / 10000) % 100;

    if (sec > 59) {
      sec = sec - 60;
      min = min + 1 ;
    }

    if (min > 59) {
      min -= 60;
      hour += 1;
    }

    console.log(`sec: ${sec}`);
    console.log(`min: ${min}`);
    console.log(`hour: ${hour}`);


    this.setState({
      editable: true,
      exercises: exerciseArray,
      timerDisplay: `${hour}:${min}:${sec}`

    });
  }

  go() {
    console.log('Start workout!');
    console.log(this.state);
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
        onPress={ () => this.ready(this.currentExerciseArray) }
        >
        <Text style={ Object.assign({}, buttonTextStyle, {color: '#ff3b30'}) }>READY?</Text>
      </TouchableOpacity>
    ); }

    return (
      <TouchableOpacity
        style={Object.assign({}, buttonStyle, { marginTop: 10, marginBottom: 10 })}
        onPress={ () => this.go()}
        >
        <Text style={ Object.assign({}, buttonTextStyle, {color: '#4cd964'}) }>GO!</Text>
      </TouchableOpacity>
    );

  }

  render() {
    const { workoutType } = this.props.navigation.state.params;
    // console.log(this.state);
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
                  maxLength={8}
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
