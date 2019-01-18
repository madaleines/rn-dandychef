import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Recipes from './Recipes';
import Login from './Login';


const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Recipes: { screen: Recipes },
  Login: { screen: Login },
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
