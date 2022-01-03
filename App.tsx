import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { AppBootstrap } from "./components";
import AppNavigator from "./navigation/AppNavigator";
import store from "./store";
import * as Notifications from "expo-notifications";

enableScreens(true);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <Provider store={store}>
      <AppBootstrap>
        <AppNavigator />
      </AppBootstrap>
    </Provider>
  );
}
