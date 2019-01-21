import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Dashboard from './Dashboard';
import AddRecipe from './AddRecipe'
import SnapRecipe from './SnapRecipe'

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
  AddRecipe: { screen: AddRecipe },
  SnapRecipe: { screen: SnapRecipe }
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
