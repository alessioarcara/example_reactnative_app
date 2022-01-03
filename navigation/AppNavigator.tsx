import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import { useAppSelector } from "../store/hooks";
import ShopNavigator from "./ShopNavigator";
import { StartupScreen } from "../screens";

const AppNavigator = () => {
  const isSignedIn = useAppSelector((state) => !!state.auth.token);
  const didTryToLogin = useAppSelector((state) => state.auth.didTryLogin);

  return (
    <NavigationContainer>
      {isSignedIn && <ShopNavigator />}
      {!isSignedIn && didTryToLogin && <AuthNavigator />}
      {!isSignedIn && !didTryToLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
