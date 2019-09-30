import React, { Component } from 'react';
import DayPicker from './DayPicker'
import TimePicker from './TimePicker'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  // Button,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import {
  Button
} from 'native-base'
import { FirebaseWrapper } from '../firebase/firebase';

export default class AddNudge extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      time: '',
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    }
    this.setDates = this.setDates.bind(this)
    this.setTime = this.setTime.bind(this)
  }

  setDates(day) {
    this.setState(day)
  }

  setTime(time) {
    this.setState(time)
  }

  async createNudge() {
    try {
      this.props.closeModal()
      await FirebaseWrapper.GetInstance().CreateNewDocument('nudges',
      {text: this.state.text,
      time: this.state.time,
      Monday: this.state.Monday,
      Tuesday: this.state.Tuesday,
      Wednesday: this.state.Wednesday,
      Thursday: this.state.Thursday,
      Friday: this.state.Friday,
      Saturday: this.state.Saturday,
      Sunday: this.state.Sunday
      })
      // this.setState = {
      //   text: ''
      // }

      this.setState({
        text: '',
        time: '',
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      })


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
          <View style={styles.headerContainer}>
            <Text style={styles.text}>Add a Nudge</Text>
            {/* <Text></Text> */}
            <TouchableHighlight
                onPress={() => {
                  this.props.closeModal()
                }}>
                <Image
                  source={require('./../assets/images/close-512.png')}
                  style={styles.close}
                />
            </TouchableHighlight>
          </View>
          {/* <View > */}
            <TextInput
              // multiline={true}
              style={styles.textInput}
              placeholder="How can we Nudge you?"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          {/* </View> */}

          {/* <ScrollView> */}
          {/* <Text>Select the time and frequency: </Text> */}
          <View style={styles.timing}>
            <DayPicker setDates={this.setDates} state={this.state}/>
            <TimePicker setTime={this.setTime}/>
          </View>
          {/* <Button style={styles.button}
            title="Get Nudged!"
            // color='red'
            onPress={() => {this.createNudge()}}
          >

            </Button> */}

          <Button
            onPress={() => {this.createNudge()}}
            title="Get Nudged!"
            full
            rounded
            primary
            // style={styles.button}
          >
            <Text style={{ color:'white'}}>Get Nudged!</Text>
            </Button>
          {/* </ScrollView> */}


        </View>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    marginTop: 40,
    // flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginLeft: 40,
    // color: 'white',
    fontWeight: 'bold',
    flex: 1
  },
  headerContainer: {
      // height: 30,
      // flex: 1,
      flexDirection: 'row',
      backgroundColor: '#800000',

      // justifyContent: 'center',
      // marginTop: 40,
      alignItems: 'center',
      // paddingLeft: 30,
      // borderBottomWidth: 1,
      // backgroundColor: '#800000',
      // color: 'white',
      // borderBottomColor: '#800000'

  },
  close: {
    width: 30,
    height: 30,
    // marginLeft: 340,
    // alignSelf: 'flex-end',
    marginRight: 2,
    // marginBottom: 10
  },
  button: {
    // width: 300,
    // marginLeft: 60
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center'
    // borderWidth: 4
  },
  timing: {
    // flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // justifyContent: 'center',
    flexDirection: 'row',
    // paddingTop: 50,
    paddingBottom: 50,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    paddingTop: 20
  },
  textInput: {
    paddingLeft: 40,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    // borderBottomColor: 'grey',
    borderWidth: 3,

    marginTop: 30,
    width: 400,
    marginBottom: 30,
    borderColor: '#f0f0f5',
    // flex: 1
    // height: 80
  },
  day: {
    width: 20
  }
});
