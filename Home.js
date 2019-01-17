import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Would you like to Add a Recipe?</Text>
        <Button
          title="Add some recipes"
          onPress={() =>
            this.props.navigation.navigate('Recipes')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
