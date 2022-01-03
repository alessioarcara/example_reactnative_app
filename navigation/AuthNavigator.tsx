import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/user/AuthScreen";
import { defaultScreenOptions } from "./defaultNavigatorOptions";

export type AuthStackNavigatorParams = {
  Authentication: undefined;
};

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Authentication"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
