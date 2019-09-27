import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import * as firebase from 'firebase'
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  StyleSheet,
  Label
} from 'native-base'

import {Text} from 'react-native'

export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  // return <ExpoConfigView />;

  async signOut() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error)
    }

  }

  render() {
    return (
      <Button
              full
              rounded
              onPress={this.signOut}
      >
        <Text style={{ color:'white'}}>Log Out</Text>
      </Button>
    )
  }

}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
