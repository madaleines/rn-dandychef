import React, { Component } from "react";
import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TouchableHighlight, Modal } from "react-native";
import firebase from 'react-native-firebase';
import { MaterialDialog, MultiPickerMaterialDialog } from 'react-native-material-dialog';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props)

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
      isModalVisible: false,
    };
    this.updateIndex = this.updateIndex.bind(this)
  }

  showModal = (selectedItem) => this.setState({ isModalVisible: true, selectedItem })
  hideModal = () => this.setState({ isModalVisible: false })

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
                onPress={(item) => {
                  this.showModal(item)}}
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

          <MultiPickerMaterialDialog
            title={'Select from the following:'}
            scrolled
            items={this.props.navigation.state.params.textBlocks.map((row, index) => ({ value: index, label: row }))}
            visible={this.state.isModalVisible}
            selectedItems={this.state.scrolledMultiPickerSelectedItems}
            onCancel={() => this.setState({ isModalVisible: false })}
            onOk={result => {
              this.setState({ isModalVisible: false });
              this.setState({
                scrolledMultiPickerSelectedItems: result.selectedItems,
              });
            }}
            />

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
