import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../components/LoginComponent";
import OTPPage from "../components/OtpComponent";
import LoginProfilePage from "../components/ProfilePage";
import ParkingDetails from "../Screen/ParkingDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomePage";
import MyVehicle from "../Screen/MyVehicle";
import Profile from "../Screen/Profile";
import Myparking from "../Screen/MyParking";
import ShareDetails from "../Screen/ShareData";
import GreenPassDetails from "../Screen/GreenPassDetails"
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

function Tabnavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: 9,
          paddingTop: 9,
          height: 60,
        },
        tabBarActiveTintColor: "#084B82",
        tabBarInactiveTintColor: "#8D8D8D",
      }}
    >
      {}
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
        component={Myparking}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={"car-brake-parking"}
              color={color}
              size={22}
            />
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
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="MainDesign">
        <Stack.Screen
          name="MainDesign"
          component={Tabnavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPPage"
          component={OTPPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginProfilePage"
          component={LoginProfilePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Park"
          component={ParkingDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShareDetails"
          component={ShareDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GreenPassDetails"
          component={GreenPassDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
