import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List, MainButton, ProductItem } from "../../components";
import { Product } from "../../models/product";
import { ProductsStackNavigatorParams } from "../../navigation/ProductsNavigator";
import { useGetProductsQuery } from "../../services/shopApi";
import { addToCart } from "../../store/cart";
import { useAppDispatch } from "../../store/hooks";
import { ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/default-styles";

type ProductsOverviewScreenProps = {
  navigation: StackNavigationProp<
    ProductsStackNavigatorParams,
    "ProductsOverview"
  >;
};

const ProductsOverviewScreen = ({
  navigation,
}: ProductsOverviewScreenProps) => {
  const dispatch = useAppDispatch();

  const renderProductItem = ({ item }: { item: Product }) => {
    const goToProductDetail = () => {
      navigation.navigate("ProductDetail", {
        productId: item.id,
        title: item.title,
      });
    };

    return (
      <ProductItem
        image={item.imageUrl}
        imagePressHandler={goToProductDetail}
        title={item.title}
        price={item.price}
        leftButtonTitle="Detail"
        rightButtonTitle="Cart"
        leftButtonPressHandler={goToProductDetail}
        rightButtonPressHandler={() => {
          dispatch(addToCart({ ...item }));
        }}
      />
    );
  };

  const {
    data: products,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();

  if (isLoading) {
    return (
      <View style={defaultStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products?.length === 0) {
    return (
      <View style={defaultStyles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={defaultStyles.centered}>
        <Text style={{ paddingBottom: 20 }}>An error occurred!</Text>
        <MainButton onPress={refetch}>Try again!</MainButton>
      </View>
    );
  }

  return (
    <List
      onRefresh={refetch}
      refreshing={isFetching}
      items={products!}
      render={renderProductItem}
    />
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
