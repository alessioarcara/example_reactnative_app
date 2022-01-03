import React from "react";
import { FlatList, FlatListProps, StyleSheet, View } from "react-native";

const List = <ListItem,>({
  items,
  render,
  onRefresh,
  refreshing,
}: {
  items: ListItem[];
  render: (itemData: { index: number; item: ListItem }) => JSX.Element;
} & Pick<FlatListProps<ListItem>, "refreshing" | "onRefresh">) => {
  return (
    <View style={styles.list}>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={items}
        renderItem={render}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
