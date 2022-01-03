import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "../UI/Card";
import Order from "../../models/order";
import MainButton from "../UI/MainButton";
import CartItem from "./CartItem";

const OrderItem = ({ totalAmount, date, items }: Order) => {
  const [showOrderedItems, setShowOrderedItems] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <MainButton
        onPress={() => setShowOrderedItems((prevState) => !prevState)}
      >
        {showOrderedItems ? "Hide Details" : "Show Details"}
      </MainButton>
      {showOrderedItems && (
        <View style={styles.detailItems}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              id={cartItem.id}
              quantity={cartItem.quantity}
              price={cartItem.price}
              title={cartItem.title}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});
