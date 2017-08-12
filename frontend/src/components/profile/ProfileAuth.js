import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import Header from '../Header';
import axios from 'axios';

import { configs } from '../../config/config';

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
      username: '',
      emailInput: '',
      passwordInput: ''
    };

    this._updateText = this._updateText.bind(this);
    this._changeForm = this._changeForm.bind(this);
    this._signup = this._signup.bind(this);
    this._login = this._login.bind(this);
    this._sendLoginRequest = this._sendLoginRequest.bind(this);
    this._requestToken = this._requestToken.bind(this);
  }

  _updateText(field) {
     return (val) => {
       this.setState({[field]: val});
     }
  }

  _signup() {
    let newUser = {
      username: this.state.username,
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    // using session/id/ because not being able to get currentUser at backend for now
    const headers = { 'Authorization': 'Bearer ' + configs.appToken }
    axios.post('api/signup/', newUser, { headers })
      .then(resp => {
        // TODO: actually we need to redirect user to the workout page
        // alert("Sign Up Success!")
        this._requestToken(this.state.username, this.state.passwordInput);
        AsyncStorage.setItem('currentUser', JSON.stringify(resp.data));
        this.props.parent.setState({ loggedIn: true });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorData = error.response.data;
          const errorMsg = Object.keys(errorData).map(k => `${k}: ${errorData[k]}`)
          alert(errorMsg.join('\n'))
        };
      });
  }

  _login() {
    var authToken = '';
    AsyncStorage.getItem('authToken').then(res => {
      console.log(res);
      // request oauth token if not exists locally
      if (res === null) {
        this._requestToken(this.state.username, this.state.passwordInput);
      } else {
        authToken = res;
      }
    })
      // send request after local var authToken is set
      .then(() => this._sendLoginRequest(authToken));
  }

  _requestToken(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    const auth = {
      username: configs.clientId,
      password: configs.clientSecret,
    }
    axios.post("o/token/", params, { auth })
      .then(resp => {
        authToken = resp.data.access_token;
        AsyncStorage.setItem('authToken', authToken);
      }
    );
  }

  _sendLoginRequest(authToken) {
    // log in with auth token
    const newSession = {
      username: this.state.username,
      password: this.state.passwordInput,
    }
    const headers = { 'Authorization': 'Bearer ' + authToken }
    axios.post('api/session/0/', newSession, { headers })
      .then(resp => {
        console.log(resp);
        AsyncStorage.setItem('currentUser', JSON.stringify(resp.data))
        this.props.parent.setState({ loggedIn: true });
      })
      .catch((err) => {
        // this.props.parent.setState({loggedIn: true});
        alert("Invalid combination of username and password.")
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
    let newUsername;

    switch (this.state.newUser) {
      case true:
        textDisplay.button = 'Sign Up';
        textDisplay.footer = 'Already have an account?';
        newUsername = (
          <View>
            <Text style={subHeaderStyle}>EMAIL</Text>
            <TextInput
              id="emailInput"
              style={Object.assign({}, inputStyle, { marginBottom: 0})}
              placeholder="athlete@quickfit.com"
              returnKeyType='next'
              onChangeText={this._updateText("emailInput")}
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
              {newUsername}

              <Text style={subHeaderStyle}>FULL NAME</Text>
              <TextInput
                id="username"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="What is your name?"
                returnKeyType='next'
                onChangeText={this._updateText("username")}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileAuth;
