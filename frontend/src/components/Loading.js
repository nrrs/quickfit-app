import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = () =>{
  return (
    <ActivityIndicator
      animating={true}
      size={'large'}
      style = {{
        alignSelf: 'center',
        justifyContent: 'center'
      }}
    />
  );
};

export default Loading;
