import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import Header from '../Header';
import axios from 'axios';

class ProfileAuth extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <FIcon name="user" color={tintColor} style={iconStyle} />
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      emailInput: '',
      passwordInput: '',
      descriptionInput: ''
    };

    this._updateText = this._updateText.bind(this);
    this._changeForm = this._changeForm.bind(this);
    this._signup = this._signup.bind(this);
    this._login = this._login.bind(this);
  }

  _updateText(field) {
     return (val) => {
       this.setState({[field]: val});
     }
  }

  _signup() {
    let newUser = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    console.log(newUser);
    axios.post('/user', newUser)
      .then((res) => {
        alert('signup success!');
      })
      .catch((err) => {
        alert('signup fail!');
      });
  }

  _login() {
    let newSession = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    console.log(newSession);
    axios.post('/user', newSession)
      .then((res) => {
        alert('login success!');
      })
      .catch((err) => {
        alert('login fail!');
      });
  }

  _changeForm() {
    this.setState({ newUser: !this.state.newUser });
  }

  render() {
    let textDisplay = {
      button: 'Log In',
      footer: 'New to QuickFit?'
    };

    switch (this.state.newUser) {
      case true:
        textDisplay.button = 'Sign Up'
        textDisplay.footer = 'Already have an account?'
        break;
      default:

    }

    return (
      <View style={{ flex: 1 }}>
        <Header title='QuickFit'/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              <Text style={subHeaderStyle}>EMAIL</Text>
              <TextInput
                id="emailInput"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="athlete@quickfit.com"
                onChangeText={this._updateText("emailInput")}
              />
              <Text style={subHeaderStyle}>PASSWORD</Text>
              <TextInput
                id="passwordInput"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="Minimum 6 characters"
                onChangeText={this._updateText("passwordInput")}
              />
            <TouchableOpacity style={Object.assign({}, buttonStyle, {marginTop: 30})} onPress={this.state.newUser ? this._signup: this._login}>
                <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>{textDisplay.button}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._changeForm}>
                <Text style={captionStyle}>{textDisplay.footer}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileAuth;
