import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
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
    this._logout = this._logout.bind(this);
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
    axios.patch('https://rallycoding.herokuapp.com/api/music_albums', updateProfile)
      .then((res) => {
        alert('update success!');
      })
      .catch((err) => {
        alert('update fail!');
      });
  }

  _logout() {
    axios.delete('https://rallycoding.herokuapp.com/api/music_albums')
      .then((res) => {
        alert('logout success!');
        this.props.screenProps.setState({loggedIn: false});
      })
      .catch((err) => {
        alert('Unable to logout');
        this.props.screenProps.setState({loggedIn: false});
      });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <ScrollView style={formContainerStyle}>
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
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 30})}
                onPress={this._handleSubmit}
                >
                <Text style={buttonTextStyle}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 10, marginBottom: 10})}
                onPress={this._logout}
                >
                <Text style={Object.assign({}, buttonTextStyle, { color: '#ff3b30' })}>Sign Out</Text>
              </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default ProfileEdit;
