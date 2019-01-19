import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.navigation.navigate('Home')

    // ### Styles of Async Calls
    //1: async / await pattern ^

    //2: Promises (modern)
    // GoogleSignin.revoke().then((response) => {
    //   // do stuff with response
    // return Google.doOtherThingOnTheInternetThatReturnsAPromise()
    // })
    // .then((responseToThatOtherThing) => {
    //  do stuff
    // })
    // .catch((error) => {
    //   //do stuff with error?
    // this error is the first error that happens
    // })

    //3: Callbacks (this is shit - see ES5 and ObjectiveC)
    // doAsyncThing is a method which takes a 'callback' as a parameter
    // doAsyncThing((response) => {
      // second layer of the callback
        // doSecondAsyncThingWithCallback((callback2) => {
        //
        // })
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Welcome User </Text>
        <Text>Add A Recipe!</Text>
        <Button
          title="Logout"
          onPress={() => {
            this.signOut()
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
