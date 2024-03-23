import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TodayWeatherScreen from '../screens/TodayWeatherScreen';
import TommorowWeatherScreen from '../screens/TommorowWeatherScreen';
import TopBarNavigationHeader from './TopBarNavigationHeader';

const Tab = createMaterialTopTabNavigator();

const screens = [
  {
    name: 'Today',
    label: 'Today',
    component: TodayWeatherScreen,
  },
  {
    name: 'Tommorrow',
    label: 'Daily Forecast',
    component: TommorowWeatherScreen,
  },
];

export default function TopBarNavigation() {
  return (
    <Tab.Navigator tabBar={props => <TopBarNavigationHeader {...props} />}>
      {screens.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            options={{tabBarLabel: item.label}}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}
