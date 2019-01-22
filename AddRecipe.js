import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import { View, Text, FlatList, Button } from "react-native";

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
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

  saveRecipe() {
    // code to save recipe to firestore/firebase

    this.props.navigation.navigate('Dashboard')
  }

  render() {
    return (
      <View>
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          data={ this.props.navigation.state.params.textBlocks }
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item}
              containerStyle={{ borderBottomWidth: 0 }}
              />
          )}
          keyExtractor={item => item.email}
          />
      </List>

      <Button
        title="Save Recipe"
        onPress={() => {
          this.saveRecipe()
        }}
        />
      </View>
    );
  }
}
