import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../components/LoginComponent";
import DetailsScreen from "../components/OtpComponent";
import LoginProfilePage from "../components/ProfilePage";
import Tabnavigator from "./TabNavigator";

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Tabnavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="LoginProfilePage"
          component={LoginProfilePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const Stack = createNativeStackNavigator();

export default App;
