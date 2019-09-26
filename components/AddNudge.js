import React, { Component } from 'react';
import DayPicker from './DayPicker'
import TimePicker from './TimePicker'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Modal,
  TouchableHighlight
} from 'react-native';
import { FirebaseWrapper } from '../firebase/firebase';

export default class AddNudge extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  async createNudge() {
    try {
      this.props.closeModal()
      await FirebaseWrapper.GetInstance().CreateNewDocument('nudges', {text: this.state.text })

      alert('Nudge successfully added!')
    } catch (error) {
      console.log('something went wrong creating post: ', error)
    }

  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isModalVisible}
      >
        <View style={styles.container}>
        <TouchableHighlight
            onPress={() => {
              this.props.closeModal()
            }}>
            <Image
              source={{ uri: 'https://cdn4.iconfinder.com/data/icons/media-controls-4/100/close-512.png' }}
              style={styles.close}
            />
          </TouchableHighlight>
         <TextInput
          multiline={true}
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
          onPress={() => {this.createNudge()}}
          title="Get Nudged!"
        />
        </View>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 40,
    // flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  close: {
    width: 30,
    height: 30,
    marginLeft: 380,
    // alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10
  },
  timing: {
    // flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 50,
    paddingBottom: 50,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textInput: {
    paddingLeft: 0,
    height: 80
  },
  day: {
    width: 20
  }
});
