import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Recipes from './Recipes';


const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Recipes: { screen: Recipes },
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
