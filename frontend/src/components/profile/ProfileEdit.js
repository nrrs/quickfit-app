import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, buttonTextStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

import { configs } from '../../config/config';

class ProfileEdit extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile'
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };

    this._updateText = this._updateText.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this)
    this._signout = this._signout.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props.screenProps.state;
    this.setState({
      username: currentUser.username,
      email: currentUser.email,
    });
  }

  _updateText(field) {
     return (val) => {
       this.setState({[field]: val});
     }
  }

  _handleUpdate() {
    let updateProfile = {
      username: this.state.username,
      email: this.state.email.toLowerCase(),
    };
    console.log(updateProfile);
    const url = `api/users/${this.props.screenProps.state.currentUser.id}/`;
    axios.patch(url, updateProfile).then(res => {
      AsyncStorage.setItem('currentUser', JSON.stringify(res.data)).then(() => {
        const copyState = Object.assign({}, this.props.screenProps.state.currentUser);
        this.props.screenProps.setState({
          currentUser: Object.assign({}, copyState, { username: this.state.username })
        });
        this.props.navigation.dispatch(resetAction);
      });
    }).catch(err => {
      console.log(err);
      this.props.navigation.dispatch(resetAction);
    });
  }

  _signout() {
    const url = `api/session/${this.props.screenProps.state.currentUser.id}/`;
    axios.delete(url).then(res => {
      AsyncStorage.removeItem('authToken');
      AsyncStorage.removeItem('currentUser').then(() => {
        // naviagete back to profile screen
        this.props.screenProps.setState({
          loggedIn: false,
          currentUser: {}
        });
      });
    });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <ScrollView style={formContainerStyle}>
              <Text style={subHeaderStyle}>USERNAME</Text>
              <TextInput
                id="username"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                defaultValue={this.state.username}
                placeholder={this.state.username}
                onChangeText={this._updateText("username")}
              />
              <Text style={subHeaderStyle}>EMAIL</Text>
              <TextInput
                id="email"
                style={Object.assign({}, inputStyle, { marginBottom: 0})}
                defaultValue={this.state.email}
                placeholder={this.state.email}
                onChangeText={this._updateText("email")}
              />
              <TouchableOpacity
                style={Object.assign({}, buttonStyle, {marginTop: 30})}
                onPress={this._handleUpdate}
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

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'index' }),
  ]
})

export default ProfileEdit;
