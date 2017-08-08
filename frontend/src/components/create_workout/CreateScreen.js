import React from 'react';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';

export default class CreateScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Create Movement',
    tabBarIcon: ({ tintColor }) => (
        <Text>
          <IIcon name="md-add-circle" color={tintColor} style={styles.textStyle} />
        </Text>
    )
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formWrapper} style={styles.containerStyle} >
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            keyboardType={'numeric'}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 2
  },
  textStyle: {
    fontSize: 25
  }
};
