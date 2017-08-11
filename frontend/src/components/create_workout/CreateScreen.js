import React from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import { iconStyle, textStyle, subHeaderStyle } from '../../styles/styles';
import Header from '../Header';
import axios from 'axios';

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
      nameInput: '',
      typeInput: '',
      descriptionInput: ''
    };
    this._handlePress = this._handlePress.bind(this);
    this._updateText = this._updateText.bind(this);
  }

  _handlePress(e) {
    e.preventDefault;
    let newMovement = {
      name: this.state.nameInput,
      type: this.state.typeInput,
      description: this.state.descriptionInput
    }
    console.log(newMovement);
    axios.post('/user', newMovement)
      .then((res) => {
        alert('post success!');
      })
      .catch((err) => {
        alert('post fail!');
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
              <Text style={subHeaderStyle}> ADD MOVEMENT </Text>
              <TextInput
                id="nameInput"
                style={inputStyle}
                placeholder="Name"
                onChangeText={this._updateText("nameInput")}
              />
              <TextInput
                id="typeInput"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="Type: ie. weightlifting, dance, or cardio"
                onChangeText={this._updateText("typeInput")}
              />
              <Text style={subHeaderStyle}> ADD DESCRIPTION </Text>
              <TextInput
                id="descriptionInput"
                style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
                placeholder="Keep your core tight and engage!"
                multiline={true}
                onChangeText={this._updateText("descriptionInput")}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 30})}
                onPress={this._handlePress}
              >
                <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>New Exercise</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
