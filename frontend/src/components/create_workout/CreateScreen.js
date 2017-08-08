import React from 'react';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <IIcon name="md-add-circle" color={tintColor} style={styles.iconStyle} />
        </Text>
    )
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { containerStyle, inputStyle, buttonStyle, textStyle } = styles;
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
          <Text style={textStyle}> Submit </Text>
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  buttonStyle: {
    backgroundColor: 'orange',
    borderColor: '#ccc',
    borderRadius: 5,
    width: 100,
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  inputStyle: {
    height: 60,
    marginTop: 5,
    padding: 15,
    borderColor: '#e2e2e2',
    borderWidth: 1
  },
  textStyle: {
    fontSize: 25,
    color: '#fff'
  },

  iconStyle: {
    fontSize: 25
  }
};
