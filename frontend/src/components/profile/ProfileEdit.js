import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import axios from 'axios';

class ProfileEdit extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile'
  }

  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      fullName: '',
      emailInput: '',
      passwordInput: '',
    };

    this._updateText = this._updateText.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _updateText(field) {
     return (val) => {
       this.setState({[field]: val});
     }
  }

  _handleSubmit() {
    let updateProfile = {
      username: this.state.fullName,
      email: this.state.emailInput,
      password: this.state.passwordInput,
    }
    console.log(updateProfile);
    axios.patch('/user', updateProfile)
      .then((res) => {
        alert('update success!');
      })
      .catch((err) => {
        alert('update fail!');
      });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={formContainerStyle}>
              <Text style={subHeaderStyle}>FULL NAME</Text>
              <TextInput
                id="fullName"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                placeholder="Usain Bolt"
                onChangeText={this._updateText("fullName")}
              />
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
            <TouchableOpacity style={Object.assign({}, buttonStyle, {marginTop: 30})} onPress={this._handleSubmit}>
                <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}> Update </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileEdit;