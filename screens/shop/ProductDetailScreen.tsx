import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { MainButton } from "../../components";
import { ProductsStackNavigatorParams } from "../../navigation/ProductsNavigator";
import { useGetProductsQuery } from "../../services/shopApi";
import { addToCart } from "../../store/cart";
import { useAppDispatch } from "../../store/hooks";

type ProductDetailScreenProps = {
  navigation: StackNavigationProp<
    ProductsStackNavigatorParams,
    "ProductDetail"
  >;
  route: RouteProp<ProductsStackNavigatorParams, "ProductDetail">;
};

const ProductDetailScreen = ({
  navigation,
  route,
}: ProductDetailScreenProps) => {
  const { selectedProduct } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      selectedProduct: data?.find(
        (product) => product.id === route.params.productId
      ),
    }),
  });

  const dispatch = useAppDispatch();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Image source={{ uri: selectedProduct?.imageUrl }} style={styles.image} />
      <View style={styles.productDetailContainer}>
        <Text style={styles.price}>${selectedProduct?.price?.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct?.description}</Text>
        <MainButton
          onPress={() => {
            dispatch(addToCart(selectedProduct!));
            navigation.navigate("Cart", { userId: "u1" });
          }}
        >
          Add to cart
        </MainButton>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    margin: 20,
  },
  image: {
    height: 300,
    width: "100%",
  },
});
