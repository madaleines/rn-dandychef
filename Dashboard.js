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
import { List, ListItem, SearchBar } from "react-native-elements";
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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Search for a Saved Recipe..." lightTheme round />;
  };


  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };



  render() {
    return (
    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        data={this.state.data}
        renderItem={({ item }) => (
          <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        )}
        keyExtractor={item => item.email}
      />
    </List>
  );
  }
}

export default Dashboard;
