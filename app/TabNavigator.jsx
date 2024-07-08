import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screen/HomePage";
import MyVehicle from "../Screen/MyVehicle";

import Profile from "../Screen/Profile";
import TopBar from './TopBar'
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home1"
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle : {backgroundColor : '#fff' , borderTopRightRadius:20, borderTopLeftRadius:20, padding:4},
          tabBarActiveTintColor: '#084B82',
          tabBarInactiveTintColor: '#8D8D8D'
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name={"home"} color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="My Vehicle"
          component={MyVehicle}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={"car-outline"} color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="My Parking"
          component={TopBar}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons  name={"car-brake-parking"} color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome name={"user-o"} color={color} size={22} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Stack = createNativeStackNavigator();

export default Tabnavigation;
