import React, { Component } from "react";
import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import firebase from 'react-native-firebase';
import { MaterialDialog } from 'react-native-material-dialog';



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
      description: '',
      allIngredients: [],
      allDirections: [],
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
      recipe: {
        description: this.state.description,
        allIngredients: this.state.ingredients,
        allDirections: this.state.directions
      },
    });

    this.setState({
      description: '',
      allIngredients: [],
      allDirections: []
    });

    this.props.navigation.navigate('Dashboard')
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  updateDescription(value) {
    // code to add ListItem element to the description (maybe have it be a form user maunally types instead?)
  }

  updateIngredients(value) {
    this.setState(prevState => ({
      allIngredients: [...prevState.allIngredients, value]
    }))
  }

  updateDirections(value) {
    this.setState(prevState => ({
      allIngredients: [...prevState.allIngredients, value]
    }))
  }

  selectOptions() {
    return (
      <View style={styles.container}>
        <MaterialDialog
          title="Use Google's Location Service?"
          visible={this.state.visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}>
          <Text style={styles.dialogText}>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </Text>
        </MaterialDialog>;

      </View>

    )
  }

  render() {
    const { selectedIndex } = this.state
    const buttons = ['Ingredients', 'Directions']

    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={ ['Select Ingredients', 'Select Directions'] }
            renderItem={({ item }) => (
              <ListItem
                title={item}
                containerStyle={{ borderBottomWidth: 0 }}
                buttonGroup
                onPress={this.selectOptions.bind(this)} 
                style={styles.fab}
                />
            )}
            keyExtractor={item => item}
            />
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 50}}
            />
        </List>

        <TouchableOpacity onPress={() => this.saveRecipe.bind(this)} style={styles.fab}>
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
