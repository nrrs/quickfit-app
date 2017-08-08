import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Timer from './src/components/Timer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header title={"QuickFit"}/>
        <Timer />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginTop: 20,
    justifyContent: 'space-between'
  },
});
