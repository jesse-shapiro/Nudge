import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { CheckBox } from 'react-native-elements';

import '@expo/vector-icons';
import MyDatePicker from './TimePicker';

export default class DayPicker extends Component {
  state = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };

  setLocalDates(day) {
    this.props.setDates(day)
    this.setState(day)

    // console.log('daystate', this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          title="Monday"
          containerStyle={styles.day}
          checked={this.state.Monday}
          onPress={() => this.setLocalDates({ Monday: !this.state.Monday })
        }
        />
        <CheckBox
          title="Tuesday"
          containerStyle={styles.day}
          checked={this.state.Tuesday}
          onPress={() => this.setLocalDates({ Tuesday: !this.state.Tuesday })}
        />
        <CheckBox
          title="Wednesday"
          containerStyle={styles.day}
          checked={this.state.Wednesday}
          onPress={() => this.setLocalDates({ Wednesday: !this.state.Wednesday })}
        />
        <CheckBox
          title="Thursday"
          containerStyle={styles.day}
          checked={this.state.Thursday}
          onPress={() => this.setLocalDates({ Thursday: !this.state.Thursday })}
        />
        <CheckBox
          title="Friday"
          containerStyle={styles.day}
          checked={this.state.Friday}
          onPress={() => this.setLocalDates({ Friday: !this.state.Friday })}
        />
        <CheckBox
          title="Saturday"
          containerStyle={styles.day}
          checked={this.state.Saturday}
          onPress={() => this.setLocalDates({ Saturday: !this.state.Saturday })}
        />
        <CheckBox
          title="Sunday"
          containerStyle={styles.day}
          checked={this.state.Sunday}
          onPress={() => this.setLocalDates({ Sunday: !this.state.Sunday })}
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
    backgroundColor: 'white',
  },
  day: {
    // width: 20,
    backgroundColor: 'white',
    borderColor: 'white',
    // color: 'red'
  }
});
