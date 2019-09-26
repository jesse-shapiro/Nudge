import React, { Component } from 'react';
import DayPicker from './DayPicker'
import TimePicker from './TimePicker'
import {
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

export default class Nudges extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput>Testing out view nudges page</TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  timing: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textInput: {
    paddingLeft: 0,
    height: 80
  },
  day: {
    width: 2000
  }
});
