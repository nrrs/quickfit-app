import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle, headerStyle, headerTitleStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import ProfileAuth from './ProfileAuth';
import ProfileIndex from './ProfileIndex';
import ProfileEdit from './ProfileEdit';
import { StackNavigator } from 'react-navigation';

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
      loggedIn: false,
      currentUser: {
        id: 1,
        name: 'Bruce Wayne'
      },
      workouts: [1,2,3,4,5],
      loading: false
    }
  }

  render() {
    if (this.state.loading) return (<Text> Loading </Text>);
    return (this.state.loggedIn) ? <ProfileStackNav /> : <ProfileAuth />
  }
}

const profileStackRoutes = {
  index: { screen: ProfileIndex },
  edit: { screen: ProfileEdit},
}

const profileStackConfig = {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle
  }
}

const ProfileStackNav = StackNavigator(profileStackRoutes, profileStackConfig)

export default ProfileScreen;
