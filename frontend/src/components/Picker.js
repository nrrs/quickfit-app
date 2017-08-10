import React from 'react';
import { View, Picker as RNPicker } from 'react-native';
import PropTypes from 'prop-types';

function Picker({ renderPicker }) {
  return (
    <View>
      {renderPicker()}
      <RNPicker
        style={{ position: 'absolute', top: 0, width: 1000, height: 1000 }}
      />
    </View>
  );
}

Picker.propTypes = {
  renderPicker: PropTypes.func.isRequired,
};

Picker.Item = RNPicker.Item;

export default Picker;
