import React from 'react';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import { buttonStyle, inputStyle } from '../../styles/forms'

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
      <IIcon name="md-add-circle" color={tintColor} style={styles.iconStyle} />
    )
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { containerStyle, textStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={containerStyle} >
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

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#eee'
  },
  textStyle: {
    fontSize: 25,
    color: '#fff'
  },
  iconStyle: {
    fontSize: 25
  }
};
