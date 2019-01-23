import React, { Component } from "react";
import firebase from 'react-native-firebase';
import { List, ListItem, SearchBar } from "react-native-elements";
import { View, Text, FlatList, Button } from "react-native";

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
      allRecipes: []
    };
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('recipes')
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    let allRecipes = [];
    querySnapshot.forEach(documentSnapshot => {
      let newItem = documentSnapshot.data();
      newItem.id = documentSnapshot.id;
      allRecipes.push(newItem);
      console.log(newItem)
    });
    this.setState({ allRecipes });
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

  signOut() {
    this.props.navigation.navigate('Home')
  }

  snapRecipe() {
    this.props.navigation.navigate('SnapRecipe')
  }

  render() {
    return (
      <View>
        <Text>Welcome USER</Text>
        <Button
          title="Add Recipe"
          onPress={() => {
            this.snapRecipe()
          }}
          />
        <Button
          title="Logout"
          onPress={() => {
            this.signOut()
          }}
          />

        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={this.state.allRecipes}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.title}`}
                containerStyle={{ borderBottomWidth: 0 }}
                />
            )}
            keyExtractor={item => item.email}
            />
        </List>
      </View>
    );
  }
}

export default Dashboard;
