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
    await FirebaseWrapper.GetInstance().DeleteDocument('nudges', this.props.nudgeInfo)
  }

  render() {
    return (
      <View style={styles.postContainer}>
          <Swipeout right={this.rightButtons} onPress={this.deleteNudge} style={styles.swipe}>
            <View style={styles.dateUserContainer}>
              <Text style={styles.text}>{this.props.nudgeInfo.text} </Text>
              <View style={styles.dayOfWeekContainer}>
              {this.props.nudgeInfo.Monday
              ? <Text style={styles.dayOfWeek}>M</Text>
            // />
              : null}
              {this.props.nudgeInfo.Tuesday
              ? <Text style={styles.dayOfWeek}>T</Text>
              : null}
              {this.props.nudgeInfo.Wednesday
              ? <Text style={styles.dayOfWeek}>W</Text>
              : null}
              {this.props.nudgeInfo.Thursday
              ? <Text style={styles.dayOfWeek}>Th</Text>
              : null}
              {this.props.nudgeInfo.Friday
              ? <Text style={styles.dayOfWeek}>F</Text>
              : null}
              {this.props.nudgeInfo.Saturday
              ? <Text style={styles.dayOfWeek}>Sat</Text>
              : null}
              {this.props.nudgeInfo.Sunday
              ? <Text style={styles.dayOfWeek}>Sun</Text>
              : null}
              <Text>  {this.props.nudgeInfo.time}</Text>
              </View>
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
    backgroundColor: '#f2f2f2',
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
    backgroundColor: '#f2f2f2'

  },
  postText: {
    padding: 5,
    fontSize: 15
  },
  dayOfWeekContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dayOfWeek: {
    width: 30,
    height: 20,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: 'white',
    marginLeft: 2.5,
    marginRight: 2.5,
    borderColor: 'black',
    borderWidth: 1,
  }
})

