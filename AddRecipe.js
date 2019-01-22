import React, { Component } from "react";
import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import firebase from 'react-native-firebase';


export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.ref = firebase.firestore().collection('recipes');
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      selectedIndex: 2,
      textInput: '',
    };
    this.updateIndex = this.updateIndex.bind(this)
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
    this.ref.add({
      recipe: this.props.navigation.state.params.textBlocks,
    });
    this.setState({
      textInput: '',
    });

    this.props.navigation.navigate('Dashboard')
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
}

  render() {
    const { selectedIndex } = this.state
    const buttons = ['Hello', 'World', 'Buttons']


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
                buttonGroup
                buttonGroupButtons = {['Yes', 'No']}
                onPress={() => alert('DO SOMETHING')} style={styles.fab}
                />
            )}
            keyExtractor={item => item.email}
            />
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 50}}
            />
        </List>

        <TouchableOpacity onPress={() => this.saveRecipe()} style={styles.fab}>
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
