import React, { Component } from 'react';
import AddNudgeModal from './AddNudgeModal'
import DayPicker from './DayPicker'
import TimePicker from './TimePicker'
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Button
} from 'react-native';

export default class Nudges extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='+'
          onPress={AddNudgeModal}
        />
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
