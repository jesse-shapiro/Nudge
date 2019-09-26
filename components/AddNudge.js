import React, { Component } from 'react';
import DayPicker from './DayPicker'
import TimePicker from './TimePicker'
import {
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

export default class AddNudge extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
         <TextInput
          style={styles.textInput}
          placeholder="How can we Nudge you?"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <View style={styles.timing}>
          <DayPicker />
          <TimePicker />
        </View>
        <Button
          onPress={() => {
            alert('Nudge successfully added!');
          }}
          title="Get Nudged!"
        />
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
