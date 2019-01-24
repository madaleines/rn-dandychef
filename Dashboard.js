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
      allRecipes: [],
      filteredRecipes: []
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
    });

    this.setState({
      allRecipes: allRecipes,
      filteredRecipes: allRecipes
    });
  }

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

  searchFilterFunction = text => {
    const filteredData = this.state.filteredRecipes.filter(item => {
      return item.title.startsWith(text);
    });
    this.setState({ allRecipes: filteredData });
  };

  renderHeader = () => {
    return  (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        />
    );
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

  displayRecipe(value) {
    console.log(value)
    this.props.navigation.navigate('DisplayRecipe', {
      title: value.title,
      description: value.description,
      ingredients: value.ingredients,
      directions: value.directions
    })
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
                onPress={() => {this.displayRecipe(item)}}
                />
            )}
            keyExtractor={item => item}
            />
        </List>
      </View>
    );
  }
}

export default Dashboard;
