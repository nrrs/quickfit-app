import React from 'react';
import { View, Text } from 'react-native';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('Will Mount');
  }

  render() {
    return(
      <View>
        <Text>Timer</Text>
      </View>
    );
  }
}

export default Timer;
