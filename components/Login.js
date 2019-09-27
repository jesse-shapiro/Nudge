import React from 'react'
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'
import { FirebaseWrapper } from '../firebase/firebase';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from 'native-base'


export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log('user: ', user)
      }
    })
  }

  signUpUser = async(email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert('Please enter at least 6 characters')
        return
      }

      let cred = await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log('cred------', cred.user)
      FirebaseWrapper.GetInstance().collections('users').doc(cred.user.uid).set({
        email: email
      })


      // let user = FirebaseAuth.getInstance().getCurrentUser()
      // console.log('user----', user)


    //   firebase.auth().currentUser.updateProfile({
    //     displayName : validate.name,
    // }).then(()=>{
    //     firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/profile").set(firebase.auth().currentUser);

    } catch (error) {
      console.log(error)
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async loginWithFacebook() {
    const {type, token} = await Facebook.logInWithReadPermissionsAsync('957965991240551', {permissions: ['public_profile']})

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.comntainer}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color:'white'}}>Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color:'white'}}>Sign Up</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color:'white'}}>Log in with Facebook</Text>
          </Button>
        </Form>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
})
