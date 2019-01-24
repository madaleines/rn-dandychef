import React, { Component } from "react";
import firebase from 'react-native-firebase';
import { List, ListItem, SearchBar } from "react-native-elements";
import { View, Text, FlatList, Button } from "react-native";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)

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

  navigateHome(value) {
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    const title = this.props.navigation.state.params.title
    const description = this.props.navigation.state.params.description
    const ingredientsList = this.props.navigation.state.params.ingredients
    const directionsList = this.props.navigation.state.params.directions


    return (
      <View>
        <Text>{title}</Text>
        <Text>Description: {description}</Text>
        <Text>Ingredients: </Text>
        <Text>{ingredientsList}</Text>
        <Text>Directions: </Text>
        <Text>{directionsList}</Text>
      </View>
    );
  }
}

export default Dashboard;
