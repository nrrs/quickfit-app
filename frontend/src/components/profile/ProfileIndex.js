import React from 'react';
import { Text, TouchableWithoutFeedback, ScrollView, View, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { textStyle, iconStyle, captionStyle, subHeaderStyle } from '../../styles/styles';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';

class ProfileIndex extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <FIcon name="user" color={tintColor} style={iconStyle} />
    )
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={formContainerStyle}>
            <Text> Profile Index </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProfileIndex;
