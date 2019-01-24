import React from 'react';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      <AppNavigator/>
    );
  }
}
