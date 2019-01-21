import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import { View, Text, FlatList, Button } from "react-native";

export default class SnapRecipe extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <View>
      <Text>
      { this.props.navigation.state.params.textBlocks }
      </Text>
      </View>
    );
  }
}
