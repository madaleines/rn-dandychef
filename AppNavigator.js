import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Dashboard from './Dashboard';
import SnapRecipe from './SnapRecipe';
import AddRecipe from './AddRecipe';
import DisplayRecipe from './DisplayRecipe';


const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
  SnapRecipe: { screen: SnapRecipe },
  AddRecipe: { screen: AddRecipe },
  DisplayRecipe: { screen: DisplayRecipe },
});

const AppNavigator = createAppContainer(StackNavigator);
export default AppNavigator;
