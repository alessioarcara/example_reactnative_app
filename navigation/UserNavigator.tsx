import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import { IoniconsHeaderButtons } from "../components";
import { EditProductScreen, UserProductsScreen } from "../screens";
import { ShopDrawerNavigatorParams } from "./ShopNavigator";
import { defaultScreenOptions } from "./defaultNavigatorOptions";

export type UserStackNavigationParams = {
  UserProducts: { userId: string };
  EditProduct: { productId?: string };
};

const Stack = createStackNavigator<UserStackNavigationParams>();

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({
          navigation,
        }: {
          navigation: CompositeNavigationProp<
            DrawerNavigationProp<ShopDrawerNavigatorParams, "User">,
            StackNavigationProp<UserStackNavigationParams, "UserProducts">
          >;
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
          headerRight: () => (
            <IoniconsHeaderButtons>
              <Item
                title="Add"
                iconName="ios-add-circle"
                onPress={() => {
                  navigation.navigate("EditProduct", {});
                }}
              />
            </IoniconsHeaderButtons>
          ),
          title: "Your products",
        })}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ title: "Edit Product" }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
