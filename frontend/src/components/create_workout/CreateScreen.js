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
      currentUser: {},
      movement_name: '',
      movement_type: '',
      difficulty: '',
      description: null,
      demo_url: ''
    };
    this._handlePress = this._handlePress.bind(this);
    this._updateText = this._updateText.bind(this);
  }

  componentWillMount(){
    AsyncStorage.getItem('currentUser').then((res) => {
      this.setState({currentUser: JSON.parse(res)});
    })
  }

  _handlePress() {
    let newMovement = {
      "author": this.state.currentUser.id, // currentUser.id
      "movement_name": this.state.movement_name,
      "movement_type": this.state.movement_type,
      "difficulty": this.state.difficulty.toLowerCase(),
      "description": this.state.description,
      "demo_url": ''
    }
    console.log(newMovement);
    axios.post('api/movements/', newMovement)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
       if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
       } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         console.log(error.request);
       } else {
         // Something happened in setting up the request that triggered an Error
         console.log('Error', error.message);
       }
       console.log(error.config);
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
              />
            <Text style={createSubHeaderStyle}>MOVEMENT TYPE</Text>
              <ModalPicker
                data={movements}
                initValue="Select"
                style={{ borderRadius: 0, padding: 10  }}
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
                style={{ borderRadius: 0, padding: 10  }}
                onChange={ option => {
                  this.setState({
                    difficulty: option.label
                  });
                }}
              />

              <Text style={createSubHeaderStyle}> ADD DESCRIPTION </Text>
              <TextInput
                id="description"
                style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
                placeholder="Keep your core tight and engage!"
                multiline={true}
                onChangeText={this._updateText("description")}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 10, marginBottom: 10})}
                onPress={this._handlePress}
              >
                <Text style={buttonTextStyle}>New Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
