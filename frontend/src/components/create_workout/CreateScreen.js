import React from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, inputStyle, formContainerStyle } from '../../styles/forms';
import { iconStyle, textStyle, subHeaderStyle } from '../../styles/styles';

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
        <ScrollView>
          <View style={formContainerStyle}>
            <Text style={subHeaderStyle}>
              ADD EXERCISE
            </Text>
            <TextInput
              style={inputStyle}
              placeholder="Name"
            />
            <TextInput
              style={Object.assign({}, inputStyle, { marginBottom: 0})}
              placeholder="Type"
            />
            <Text style={subHeaderStyle}>
              ADD DESCRIPTION
            </Text>
            <TextInput
              style={Object.assign({}, inputStyle, {height: 130, paddingTop: 10})}
              placeholder="Keep your core tight and engage!"
              multiline={true}
            />

            <TouchableOpacity style={buttonStyle}>
              <Text style={{color: '#6ACDFA', fontSize: 17, fontWeight: 'bold'}}>New Exercise</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    )
  }
}

// <Text style={Object.assign({}, textStyle, {color: '#fff'})}> ADD </Text>
