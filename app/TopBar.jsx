import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyParking from '../Screen/MyParking';
import HomeCarousel from '../components/HomeCarousel.jsx'
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeCarousel}
        options={{ tabBarLabel: 'feed' }}
      />
       <Tab.Screen
        name="Feed1"
        component={HomeCarousel}
        options={{ tabBarLabel: 'feed1' }}
      />
    
    </Tab.Navigator>
  );
}