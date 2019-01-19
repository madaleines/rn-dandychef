import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Home from './Home';
import Dashboard from './Dashboard';

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Dashboard: { screen: Dashboard },
});
const AppNavigator = createAppContainer(StackNavigator);

export default AppNavigator;
