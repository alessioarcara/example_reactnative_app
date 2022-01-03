import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import { IoniconsHeaderButtons } from "../components";
import { OrdersScreen } from "../screens";
import { AppDrawerNavigatorParams } from "./AppNavigator";
import { defaultScreenOptions } from "./defaultNavigatorOptions";

const Stack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="OrdersOverview"
        component={OrdersScreen}
        options={({
          navigation,
        }: {
          navigation: DrawerNavigationProp<AppDrawerNavigatorParams, "Orders">;
        }) => ({
          headerLeft: () => (
            <IoniconsHeaderButtons>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </IoniconsHeaderButtons>
          ),
          title: "Your orders",
        })}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
