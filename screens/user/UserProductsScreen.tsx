import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text, StyleSheet, View } from "react-native";
import { List, ProductItem } from "../../components";
import defaultStyles from "../../constants/default-styles";
import { Product } from "../../models/product";
import { UserStackNavigationParams } from "../../navigation/UserNavigator";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../services/shopApi";
import { useAppSelector } from "../../store/hooks";

type UserProductsScreenProps = {
  navigation: StackNavigationProp<UserStackNavigationParams, "UserProducts">;
};

const UserProductsScreen = ({ navigation }: UserProductsScreenProps) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const { userProducts } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userProducts: data?.filter((product) => product.ownerId === userId),
    }),
  });
  const [deleteProduct] = useDeleteProductMutation();

  const renderProductItem = ({ item }: { item: Product }) => {
    const goToProductDetail = () => {
      navigation.navigate("EditProduct", {
        productId: item.id,
      });
    };

    const deleteHandler = () => {
      Alert.alert("Are you sure?", "Do you really want to delete this item?", [
        { text: "NO", style: "default" },
        {
          text: "YES",
          style: "destructive",
          onPress: () => {
            deleteProduct({ id: item.id });
          },
        },
      ]);
    };

    return (
      <ProductItem
        title={item.title}
        image={item.imageUrl}
        imagePressHandler={goToProductDetail}
        price={item.price}
        leftButtonTitle="Edit"
        leftButtonPressHandler={goToProductDetail}
        rightButtonTitle="Delete"
        rightButtonPressHandler={deleteHandler}
      />
    );
  };

  if (userProducts?.length === 0) {
    return (
      <View>
        <Text style={defaultStyles.centered}>
          No products found, maybe start creating some?
        </Text>
      </View>
    );
  }

  return <List items={userProducts!} render={renderProductItem} />;
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
