import React from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, AsyncStorage } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import { iconStyle, textStyle, subHeaderStyle } from '../../styles/styles';
import Header from '../Header';
import axios from 'axios';
import ModalPicker from 'react-native-modal-picker';

const createSubHeaderStyle = Object.assign({}, subHeaderStyle, { marginTop: 0 });

let index = 0;

const movements = [
  { key: index++, section: true, label: 'Movement Types' },
  { key: index++, label: 'Cardio' },
  { key: index++, label: 'Conditioning' },
  { key: index++, label: 'Core' },
  { key: index++, label: 'Full Body' },
  { key: index++, label: 'Lower Body' },
  { key: index++, label: 'Upper Body' },
];

const difficulties = [
  { key: index++, section: true, label: 'Difficulty' },
  { key: index++, label: 'Novice' },
  { key: index++, label: 'Intermediate' },
  { key: index++, label: 'Advanced' },
];

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
      <IIcon name="md-add-circle" color={tintColor} style={iconStyle} />
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      movement_name: '',
      movement_type: '',
      difficulty: '',
      description: '',
      demo_url: ''
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._updateText = this._updateText.bind(this);
  }


  _handleSubmit() {
    let newMovement = {
      "author": this.props.screenProps.state.currentUser.id,
      "movement_name": this.state.movement_name,
      "movement_type": this.state.movement_type,
      "difficulty": this.state.difficulty.toLowerCase(),
      "description": this.state.description,
      "demo_url": ''
    }
    axios.post('api/movements/', newMovement)
    .then(res => {
      alert('Saved!');
      this.setState({
        movement_name: '',
        movement_type: '',
        difficulty: '',
        description: null,
        demo_url: ''
      });
    })
    .catch(error => {
      alert('Uh oh, looks like your internet went out :(');
   });
  }

  _updateText(field) {
    return (val) => {
      this.setState({[field]: val});
    }
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Header title='QuickFit'/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              <Text style={createSubHeaderStyle}>ADD MOVEMENT</Text>
              <TextInput
                id="movementName"
                style={inputStyle}
                placeholder="Name"
                onChangeText={this._updateText("movement_name")}
                value={this.state.movement_name}
              />
            <Text style={createSubHeaderStyle}>MOVEMENT TYPE</Text>
              <ModalPicker
                data={movements}
                initValue="Select"
                style={{ borderRadius: 0, padding: 10 }}
                onChange={ option => {
                  this.setState({
                    movement_type: option.label
                  });
                }}
              />
            <Text style={createSubHeaderStyle}>DIFFICULTY LEVEL</Text>
              <ModalPicker
                data={difficulties}
                initValue="Select"
                style={{ borderRadius: 0, padding: 10 }}
                onChange={ option => {
                  this.setState({
                    difficulty: option.label
                  });
                }}
              />

              <Text style={createSubHeaderStyle}>ADD DESCRIPTION</Text>
              <TextInput
                id="description"
                style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
                placeholder="Keep your core tight and engage!"
                multiline={true}
                onChangeText={this._updateText("description")}
                value={this.state.description}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 10, marginBottom: 10})}
                onPress={this._handleSubmit}>
                <Text style={buttonTextStyle}>New Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
