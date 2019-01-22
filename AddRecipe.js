import React, { Component } from "react";
import { List, ListItem, SearchBar } from "react-native-elements";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from "react-native";

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
      <View style={styles.container}>
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

        <TouchableOpacity onPress={() => alert('FAB clicked')} style={styles.fab}>
         <Text style={styles.fabIcon}>+</Text>
       </TouchableOpacity>
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    height: 60,
    backgroundColor: '#03A9F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTest: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
    },

  fabIcon: {
    fontSize: 40,
    color: 'white'
  }
});
