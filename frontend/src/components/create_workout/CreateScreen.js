import React from 'react';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import { iconStyle, textStyle } from '../../styles/styles';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
      <IIcon name="md-add-circle" color={tintColor} style={iconStyle} />
    )
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formContainerStyle} >
          <TextInput
            style={inputStyle}
            placeholder="Movement Name"
          />
          <TextInput
            style={inputStyle}
            placeholder="Type"
          />
          <TextInput
            style={Object.assign({}, inputStyle, {height: 160})}
            placeholder="Description"
            multiline={true}
          />
        <TouchableOpacity style={buttonStyle}>
          <Text style={textStyle}> ADD </Text>
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
