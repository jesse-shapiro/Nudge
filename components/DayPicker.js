import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';

import '@expo/vector-icons';
import MyDatePicker from './TimePicker';

export default class App extends Component {
  state = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          title="Monday"
          style={styles.day}
          checked={this.state.Monday}
          onPress={() => this.setState({ Monday: !this.state.Monday })}
        />
        <CheckBox
          title="Tuesday"
          style={styles.day}
          checked={this.state.Tuesday}
          onPress={() => this.setState({ Tuesday: !this.state.Tuesday })}
        />
        <CheckBox
          title="Wednesday"
          style={styles.day}
          checked={this.state.Wednesday}
          onPress={() => this.setState({ Wednesday: !this.state.Wednesday })}
        />
        <CheckBox
          title="Thursday"
          style={styles.day}
          checked={this.state.Thursday}
          onPress={() => this.setState({ Thursday: !this.state.Thursday })}
        />
        <CheckBox
          title="Friday"
          style={styles.day}
          checked={this.state.Friday}
          onPress={() => this.setState({ Friday: !this.state.Friday })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  day: {
    width: 2000
  }
});
