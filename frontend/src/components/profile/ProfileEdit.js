import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import axios from 'axios';

import { configs } from '../../config/config';

class ProfileEdit extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile'
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      fullName: '',
      emailInput: '',
    };

    this._updateText = this._updateText.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._signout = this._signout.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('currentUser').then(resp => {
      const currentUser = JSON.parse(resp);
      this.setState({
        fullName: currentUser.username,
        emailInput: currentUser.email,
        userId: currentUser.id,
      });
    });
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
    }
    const url = 'api/users/' + this.state.userId + '/'
    console.log(updateProfile);
    axios.patch(url, updateProfile)
      .then(resp => {
        console.log(JSON.stringify(resp.data));
        AsyncStorage.setItem('currentUser', JSON.stringify(resp.data)).then(() => {
          // navigate back to profile screen
          this.props.navigation.goBack();
        });
      })
      .catch(err => alert(err));
  }

  _signout() {
    const url = 'api/session/' + this.state.userId + '/';
    axios.delete(url).then(resp => {
      AsyncStorage.removeItem('authToken');
      AsyncStorage.removeItem('currentUser').then(() => {
        // naviagete back to profile screen
        this.props.navigation.goBack();
      });
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
                defaultValue={this.state.fullName}
                onChangeText={this._updateText("fullName")}
              />
              <Text style={subHeaderStyle}>EMAIL</Text>
              <TextInput
                id="emailInput"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                defaultValue={this.state.emailInput}
                onChangeText={this._updateText("emailInput")}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 30})}
                onPress={this._handleSubmit}
                >
                <Text style={buttonTextStyle}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 10, marginBottom: 10})}
                onPress={this._signout}
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
