import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
