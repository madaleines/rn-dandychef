import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Dashboard from './Dashboard';
import SnapRecipe from './SnapRecipe';
import AddRecipe from './AddRecipe';

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
  SnapRecipe: { screen: SnapRecipe },
  AddRecipe: { screen: AddRecipe },
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
