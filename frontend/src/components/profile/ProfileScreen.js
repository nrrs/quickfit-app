import React from 'react';
import { Text } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <FIcon name="user-circle-o" color={tintColor} style={styles.textStyle}/>
        </Text>
    )
  }
  render() {
    return (
      <Text> Profile Page </Text>
    )
  }
}

export default ProfileScreen;

const styles = {
  textStyle: {
    fontSize: 25
  }
};
