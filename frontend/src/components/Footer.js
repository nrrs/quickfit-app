import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <TouchableOpacity>
        <Text>
          <FIcon name="user-circle-o" style={textStyle} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          <MIcon name="dumbbell" style={textStyle} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>
          <IIcon name="md-add-circle" style={textStyle} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  containerStyle: {
    height: 60,
    backgroundColor: '#4CD964',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15
  },
  textStyle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700'
  }
};

export default Footer;
