import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Card, MainButton, List, CartItem } from "../../components";
import Colors from "../../constants/Colors";
import { aggregatedProduct } from "../../models/product";
import { addOrder } from "../../services/shopApi";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const CartScreen = () => {
  const renderCartItem = ({ item }: { item: aggregatedProduct }) => {
    return (
      <CartItem
        id={item.id}
        quantity={item.quantity}
        title={item.title}
        price={item.price}
        deletable
      />
    );
  };

  const [isLoading, setIsLoading] = useState(false);
  const cartItems = useAppSelector((state) =>
    Object.values(state.cart.items).sort((a, b) => (a.id > b.id ? 1 : -1))
  );
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const dispatch = useAppDispatch();

  const submitOrderHandler = () => {
    dispatch(
      addOrder({
        items: cartItems,
        totalAmount,
        date: new Date().toISOString(),
      })
    );
  };

  return (
    <View style={styles.screen}>
      <Card>
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total:{" "}
            <Text style={styles.amount}>
              ${Math.abs(totalAmount).toFixed(2)}
            </Text>
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <MainButton
              style={{ alignSelf: "flex-start" }}
              isDisabled={cartItems.length === 0}
              onPress={submitOrderHandler}
            >
              Order Now
            </MainButton>
          )}
        </View>
      </Card>
      <View style={{ flex: 1, marginTop: 20 }}>
        <List items={cartItems} render={renderCartItem} />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "flex-start",
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});
