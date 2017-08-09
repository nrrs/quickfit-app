import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import { textStyle } from '../styles/styles';

const Header = props => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={Object.assign({}, textStyle, { fontSize: 30})}> {props.title} </Text>
      <TouchableOpacity>
        <Text>
          <EIcon name="menu" style={Object.assign({}, textStyle, { fontSize: 30})} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
};

export default Header;
