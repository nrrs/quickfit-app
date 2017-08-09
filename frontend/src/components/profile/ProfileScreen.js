import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';

class ProfileScreen extends React.Component {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={formContainerStyle}>
            <Text style={subHeaderStyle}>
              EMAIL
            </Text>
            <TextInput
              style={Object.assign({}, inputStyle, { marginBottom: 0})}
              placeholder="Please enter your email"
            />
            <Text style={subHeaderStyle}>
              PASSWORD
            </Text>
            <TextInput
              style={Object.assign({}, inputStyle, { marginBottom: 0})}
              placeholder="Please enter your password"
            />

            <TouchableOpacity style={buttonStyle}>
              <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>{textDisplay.button}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.changeForm}>
              <Text style={Object.assign({}, subHeaderStyle, {color: '#6ACDFA', alignSelf: 'center'})}>
                {textDisplay.footer}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProfileScreen;
