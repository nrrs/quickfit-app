import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = () =>{
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        animating={true}
        size={'large'}
        />
    </View>
  );
};

export default Loading;
