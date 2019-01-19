// import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
//
// export default class Dashboard extends React.Component {
//
//   constructor(props) {
//     super(props)
//
//     this.signOut = this.signOut.bind(this);
//   }
//
//   signOut() {
//     this.props.navigation.navigate('Home')
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text> Welcome User </Text>
//         <Text>Add A Recipe!</Text>
//         <Button
//           title="Logout"
//           onPress={() => {
//             this.signOut()
//           }}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { Component } from "react";
import { List, ListItem } from "react-native-elements";
import { View, Text, FlatList } from "react-native";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      // <View>HELLO</View>
      <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
            />
          )}
        />
    </List>
    );
  }
}

export default Dashboard;
