import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import { textStyle } from '../styles/styles';

const Header = props => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={Object.assign({}, textStyle, {color: '#fff'})}> {props.title} </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 50,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
};

export default Header;
