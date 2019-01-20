import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Dashboard from './Dashboard';
import AddRecipe from './AddRecipe'

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
  AddRecipe: { screen: AddRecipe }
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
