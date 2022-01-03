import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { List, OrderItem } from "../../components";
import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/default-styles";
import Order from "../../models/order";
import { useGetUserOrdersQuery } from "../../services/shopApi";
import { getReadableDate } from "../../utils/utils";

const OrdersScreen = () => {
  const { data: orders, isLoading } = useGetUserOrdersQuery();
  // const orders = useAppSelector((state) => state.orders.orders);

  const renderOrderItem = ({ item }: { item: Order }) => {
    return (
      <OrderItem
        id={item.id}
        totalAmount={item.totalAmount}
        items={item.items}
        date={getReadableDate(new Date(item.date))}
      />
    );
  };

  if (orders?.length === 0) {
    return (
      <View style={defaultStyles.centered}>
        <Text>No orders found, maybe start ordering something?</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={defaultStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return <List items={orders!} render={renderOrderItem} />;
};

export default OrdersScreen;

const styles = StyleSheet.create({});
