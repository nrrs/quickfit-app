import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import Header from '../Header';
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
      newUser: false
    };
    this.changeForm = this.changeForm.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup() {
    alert("Welcome Back")
  }

  login() {
    alert("Welcome to QuickFit")
  }

  changeForm(e) {
    e.preventDefault;
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
              <Text style={subHeaderStyle}>
                EMAIL
              </Text>
              <TextInput
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="athlete@quickfit.com"
              />
              <Text style={subHeaderStyle}>
                PASSWORD
              </Text>
              <TextInput
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="Minimum 6 characters"
              />

              <TouchableOpacity style={Object.assign({}, buttonStyle, {marginTop: 30})} onPress={this.state.newUser ? this.login: this.signup}>
                <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>{textDisplay.button}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.changeForm}>
                <Text style={captionStyle}>
                  {textDisplay.footer}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileAuth;
