import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Item } from "react-navigation-header-buttons";
import { IoniconsHeaderButtons } from "../components";
import {
  CartScreen,
  ProductDetailScreen,
  ProductsOverviewScreen,
} from "../screens";
import { ShopDrawerNavigatorParams } from "./ShopNavigator";
import { defaultScreenOptions } from "./defaultNavigatorOptions";

export type ProductsStackNavigatorParams = {
  ProductsOverview: undefined;
  ProductDetail: { productId: string; title: string };
  Cart: { userId: string };
};

const Stack = createStackNavigator<ProductsStackNavigatorParams>();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({
          navigation,
        }: {
          navigation: CompositeNavigationProp<
            DrawerNavigationProp<ShopDrawerNavigatorParams, "Shop">,
            StackNavigationProp<
              ProductsStackNavigatorParams,
              "ProductsOverview"
            >
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
                title="Cart"
                iconName="ios-cart"
                onPress={() => navigation.navigate("Cart", { userId: "u1" })}
              />
            </IoniconsHeaderButtons>
          ),
          title: "All products",
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
