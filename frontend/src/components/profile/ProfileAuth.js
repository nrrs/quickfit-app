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
      fullName: '',
      emailInput: '',
      passwordInput: ''
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
      fullname: this.state.fullName,
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    axios.post('https://rallycoding.herokuapp.com/api/music_albums', newUser)
      .then((res) => {
        this.props.parent.setState({loggedIn: true});
      })
      .catch((err) => {
        this.props.parent.setState({loggedIn: true});
      });
  }

  _login() {
    let newSession = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    axios.post('https://rallycoding.herokuapp.com/api/music_albums', newSession)
      .then((res) => {
        this.props.parent.setState({loggedIn: true});
      })
      .catch((err) => {
        this.props.parent.setState({loggedIn: true});
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
    let newFullName;

    switch (this.state.newUser) {
      case true:
        textDisplay.button = 'Sign Up';
        textDisplay.footer = 'Already have an account?';
        newFullName = (
          <View>
            <Text style={subHeaderStyle}>FULL NAME</Text>
            <TextInput
              id="fullName"
              style={Object.assign({}, inputStyle, { marginBottom: 0})}
              placeholder="What is your name?"
              returnKeyType='next'
              onChangeText={this._updateText("fullName")}
            />
          </View>
        );
        break;
      default:

    }

    return (
      <View style={{ flex: 1 }}>
        <Header title='QuickFit'/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              {newFullName}

              <Text style={subHeaderStyle}>EMAIL</Text>
              <TextInput
                id="emailInput"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="athlete@quickfit.com"
                returnKeyType='next'
                onChangeText={this._updateText("emailInput")}
              />

              <Text style={subHeaderStyle}>PASSWORD</Text>
              <TextInput
                id="passwordInput"
                secureTextEntry={true}
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="Minimum 6 characters"
                returnKeyType='done'
                onChangeText={this._updateText("passwordInput")}
              />
              <TouchableOpacity style={Object.assign({}, buttonStyle, {marginTop: 30})} onPress={this.state.newUser ? this._signup: this._login}>
                <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>{textDisplay.button}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._changeForm}>
                <Text style={captionStyle}>{textDisplay.footer}</Text>
              </TouchableOpacity>
            </View>
            <Text>{"\n"}</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={{textAlign: 'center', width: '75%'}}>By using this app, you agree to the terms and services outlined here.</Text>
            </View>
            <Text>{"\n"}</Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileAuth;
