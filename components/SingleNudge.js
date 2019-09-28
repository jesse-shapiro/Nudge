import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';
import * as firebase from 'firebase'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable-row';
import { FirebaseWrapper } from '../firebase/firebase';



export default class SingleNudge extends React.Component {
  constructor() {
    super()

    this.rightButtons = [
      {text: 'Delete',
        onPress: (data) => {
          this.deleteNudge(data)
        }
      }]
  }

  async deleteNudge() {
    // console.log('anything', this.props.nudgeInfo)
    // console.log('data: ', data)
    await FirebaseWrapper.GetInstance().DeleteDocument('nudges', this.props.nudgeInfo)
    // await firebase.database().ref('nudges' + this.props.nudgeInfo.id).set(null)
    // rowMap['$']
  }



  // <TouchableHighlight><Text>Delete</Text></TouchableHighlight>

  render() {
    // console.log('single: ', this.props.nudgeInfo)
    return (
      <View style={styles.postContainer}>
          <Swipeout right={this.rightButtons} onPress={this.deleteNudge} style={styles.swipe}>
            <View style={styles.dateUserContainer}>
              <Text style={styles.text}>{this.props.nudgeInfo.text} </Text>
              <Text> M T W Th F | 2:00pm</Text>
            </View>
          </Swipeout>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#800000',
    borderBottomWidth: 1,
  },
  swipe: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateUserContainer: {
    marginLeft: 3,

  },
  postText: {
    padding: 5,
    fontSize: 15
  }
})

