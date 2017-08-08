import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';

const Header = props => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}> {props.title} </Text>
      <TouchableOpacity>
        <Text>
          <EIcon name="menu" style={textStyle} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 50,
    backgroundColor: '#4CD964',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15
  },
  textStyle: {
    color: '#fff',
    fontSize: 30
  }
};

export default Header;
