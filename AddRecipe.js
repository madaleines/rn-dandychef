import React, { Component } from "react";
import { List, ListItem, SearchBar, ButtonGroup } from "react-native-elements";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TouchableHighlight, Modal, TextInput } from "react-native";
import firebase from 'react-native-firebase';
import { MaterialDialog, MultiPickerMaterialDialog } from 'react-native-material-dialog';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      selectedIndex: 2,
      title: '',
      description: '',
      allIngredients: [],
      allDirections: [],
      isIngredientsModalVisible: false,
      isDirectionsModalVisible: false,
    };
    this.ref = firebase.firestore().collection('recipes');
    this.updateIndex = this.updateIndex.bind(this)
  }

  showIngredientsModal = (selectedItem) => this.setState({ isIngredientsModalVisible: true, selectedItem })
  showDirectionsModal = (selectedItem) => this.setState({ isDirectionsModalVisible: true, selectedItem })

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
    let newRecipe = {
      title: this.state.title,
      description: this.state.description,
      ingredients: this.state.allIngredients,
      directions: this.state.allDirections
    }

    let recipeAdded = this.ref.add(newRecipe);

    this.props.navigation.navigate('Dashboard')
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  updateTitle(value) {
    this.setState({ title: value });
  }

  updateDescription(value) {
    this.setState({ description: value });
  }

  render() {
    const { selectedIndex } = this.state
    const buttons = ['Ingredients', 'Directions']

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Add Title'}
          value={this.state.title}
          onChangeText={(text) => this.updateTitle(text)}
          multiline={true}
          />
        <TextInput
          style={styles.input}
          placeholder={'Add Description'}
          value={this.state.description}
          onChangeText={(text) => this.updateDescription(text)}
          multiline={true}
          />
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={ ['Select Ingredients']}
            renderItem={({ item }) => (
              <ListItem
                title={item}
                containerStyle={{ borderBottomWidth: 0 }}
                buttonGroup
                onPress={(item) => {
                  this.showIngredientsModal(item)}}
                  style={styles.fab}
                  />
              )}
              keyExtractor={item => item}
              />
          </List>

          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={ ['Select Directions'] }
              renderItem={({ item }) => (
                <ListItem
                  title={item}
                  containerStyle={{ borderBottomWidth: 0 }}
                  buttonGroup
                  onPress={(item) => {
                    this.showDirectionsModal(item)}}
                    style={styles.fab}
                    />
                )}
                keyExtractor={item => item}
                />
            </List>

            <MultiPickerMaterialDialog
              title={'Select Ingredients:'}
              scrolled
              items={this.props.navigation.state.params.textBlocks.map((row, index) => ({ value: index, label: row }))}
              visible={this.state.isIngredientsModalVisible}
              selectedItems={this.state.scrolledMultiPickerSelectedItems}
              onCancel={() => this.setState({ isIngredientsModalVisible: false })}
              onOk={result => {
                console.log(result)
                this.setState({
                  allIngredients: result.selectedItems.map(item => item.label),
                  isIngredientsModalVisible: false
                });
              }}
              />

            <MultiPickerMaterialDialog
              title={'Select Directions:'}
              scrolled
              items={this.props.navigation.state.params.textBlocks.map((row, index) => ({ value: index, label: row }))}
              visible={this.state.isDirectionsModalVisible}
              selectedItems={this.state.scrolledMultiPickerSelectedItems}
              onCancel={() => this.setState({ isDirectionsModalVisible: false })}
              onOk={result => {
                console.log(result)
                this.setState({
                  allDirections: result.selectedItems.map(item => item.label),
                  isDirectionsModalVisible: false
                });
              }}
              />

            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50}}
              />

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
      },
      input: {
        borderBottomColor:'red',
        borderBottomWidth: 1,
      },
    });
