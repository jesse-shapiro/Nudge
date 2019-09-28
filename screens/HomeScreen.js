import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import SingleNudge from '../components/SingleNudge'
import HeaderBar from '../components/Header'
import Login from '../components/Login'
import * as firebase from 'firebase'
import { SwipeListView } from 'react-native-swipe-list-view';
import { List, ListItem, Content } from 'native-base'
import {
  Image,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ListView,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { FirebaseWrapper } from '../firebase/firebase';
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'


export default class HomeScreen extends Component {
  constructor() {
    super()

    this.state = {
      nudges: [],
      user: {}
    }
  }

  async componentDidMount() {
    try {
        await firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.setState({
              user
            })
          }
        })

      // var that = this
      // let user = await firebase.auth().signInWithEmailAndPassword('pancake@gmail.com', 'password')

        // console.log('-----------something or no', user)
        if (this.state.user.uid) {
          this.registerForPushNotificationsAsync(this.state.user)
        }



    } catch (error) {
      console.log(error)
    }

    await FirebaseWrapper.GetInstance().SetupCollectionListener('nudges', (nudges) => {
      this.setState({nudges})
    })
  }


  async registerForPushNotificationsAsync(user) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // console.log('---------befstatus', existingStatus)

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // console.log('---------status', status)
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    var updates = {}
    updates['expoToken'] = token
    // console.log('user-------', user.user)
    console.log('updates????????', updates)
    console.log('uid-------------', user.uid)
    firebase.firestore().collection('users').doc(user.uid).update(updates)
    // firebase.firestore().collection('users').child(user.uid).update(updates)
  }

  render() {
    // console.log('test', this.state.user)
    if (this.state.user.uid) {
      this.registerForPushNotificationsAsync(this.state.user)
    }

    return (
      // <View style={styles.container}>
        !this.state.user.uid
        ? <Login />
        : (<View style={styles.container}>
          <HeaderBar text='Nudges' style={{marginTop: StatusBar.currentHeight, backgroundColor: '#800000'}}/>
          <FlatList
            data={this.state.nudges}
            renderItem={({item}) => <SingleNudge nudgeInfo={item} key={item.id}/>}
            keyExtractor={(item, index) => item.id}
          />
        </View>
        )
        // </View>
        )
      }

    }

        {/* <SwipeListView
            data={this.state.nudges}
            renderItem={({item}) => <SingleNudge nudgeInfo={item} key={item.id}/>}
            // renderItem={ (data, rowMap) => (
            //     <View style={styles.rowFront}>
            //         <Text>I am {data.item} in a SwipeListView</Text>
            //     </View>
            // )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Right</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        /> */}



        {/* <ScrollView> */}
        {/* <Content>
          <List
            dataSource={this.state.nudges}
            renderRow={(data) => {
              return (
                <ListItem>
                  <View>
                    <Text>{data}</Text>
                    <Text>testing</Text>
                  </View>
              </ListItem>
              )

            }}
            renderLeftHiddenRow={data =>
              <Button full>
                <Icon name='information-circle' />
              </Button>
            }
            renderRightHiddenRow={data =>
              <Button full danger>
                <Icon name='trash' />
              </Button>
            }
            leftOpenValue={-75}
            rightOpenValue={-75}
            />
            </Content> */}
         {/* {
          this.state.nudges.map((nudge) => {
            return <SingleNudge nudgeInfo={nudge} key={nudge.id}/>
          })
        }
         </ScrollView> */}

    // <View style={styles.container}>
    //   <ScrollView
    //     style={styles.container}
    //     contentContainerStyle={styles.contentContainer}>
    //     <View style={styles.welcomeContainer}>
    //       <Image
    //         source={
    //           __DEV__
    //             ? require('../assets/images/robot-dev.png')
    //             : require('../assets/images/robot-prod.png')
    //         }
    //         style={styles.welcomeImage}
    //       />
    //     </View>

    //     <View style={styles.getStartedContainer}>
    //       <DevelopmentModeNotice />

    //       <Text style={styles.getStartedText}>Get started by opening</Text>

    //       <View
    //         style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
    //         <MonoText>screens/HomeScreen.js</MonoText>
    //       </View>

    //       <Text style={styles.getStartedText}>
    //         Change this text and your app will automatically reload.
    //       </Text>
    //     </View>

    //     <View style={styles.helpContainer}>
    //       <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
    //         <Text style={styles.helpLinkText}>
    //           Help, it didn’t automatically reload!
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </ScrollView>

    //   <View style={styles.tabBarInfoContainer}>
    //     <Text style={styles.tabBarInfoText}>
    //       This is a tab bar. You can edit it in:
    //     </Text>

    //     <View
    //       style={[styles.codeHighlightContainer, styles.navigationFilename]}>
    //       <MonoText style={styles.codeHighlightText}>
    //         navigation/MainTabNavigator.js
    //       </MonoText>
    //     </View>
    //   </View>
    // </View>


HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
