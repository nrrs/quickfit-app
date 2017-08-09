import React from 'react';
import { Text } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle } from '../../styles/styles';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <FIcon name="user" color={tintColor} style={iconStyle} />
    )
  }
  render() {
    return (
      <Text style={textStyle}>{this.props.name} Profile Page </Text>
    )
  }
}

export default ProfileScreen;
