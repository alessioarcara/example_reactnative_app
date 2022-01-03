import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import ProductsNavigator from "./ProductsNavigator";
import OrdersNavigator from "./OrdersNavigator";
import UserNavigator from "./UserNavigator";
import Colors from "../constants/Colors";
import { IoniconsHeaderButtons } from "../components";
import { Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/auth";

export type ShopDrawerNavigatorParams = {
  Shop: undefined;
  Orders: undefined;
  User: undefined;
};

const Drawer = createDrawerNavigator<ShopDrawerNavigatorParams>();

const defaultDrawerIcon = (androidIconName: string, iosIconName: string) =>
  ({
    drawerIcon: (drawerConfig) => (
      <IoniconsHeaderButtons>
        <Item
          title="Create"
          iconName={Platform.OS === "android" ? androidIconName : iosIconName}
          iconSize={23}
          color={drawerConfig.color}
        />
      </IoniconsHeaderButtons>
    ),
  } as DrawerNavigationOptions);

const ShopNavigator = () => {
  const dispatch = useAppDispatch();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.accent,
        drawerInactiveTintColor: "white",
        drawerContentStyle: {
          backgroundColor: Colors.primary,
        },
        drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          style={{ backgroundColor: Colors.primary }}
        >
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            icon={({ size }) => (
              <IoniconsHeaderButtons>
                <Item
                  title="Logout"
                  iconName="ios-log-out"
                  iconSize={size}
                  color="white"
                />
              </IoniconsHeaderButtons>
            )}
            labelStyle={{ color: "white" }}
            onPress={() => dispatch(logout())}
          />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="Shop"
        component={ProductsNavigator}
        options={defaultDrawerIcon("md-cart", "ios-cart")}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={defaultDrawerIcon("md-list", "ios-list")}
      />
      <Drawer.Screen
        name="User"
        component={UserNavigator}
        options={{
          ...defaultDrawerIcon("md-create", "ios-create"),
          title: "Manage products",
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;
