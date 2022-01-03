import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../store/hooks";
import { removeFromCart } from "../../store/cart";

type CartItemProps = {
  id: string;
  quantity: number;
  title: string;
  price: number;
  deletable?: boolean;
};

const CartItem = ({ id, quantity, title, price, deletable }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${(price * quantity).toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity
            onPress={() => {
              dispatch(removeFromCart(id));
            }}
            style={styles.deleteButton}
          >
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
