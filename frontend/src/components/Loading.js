import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = () =>{
  return (
    <ActivityIndicator
      animating={true}
      size={'large'}
    />
  );
};

export default Loading;
