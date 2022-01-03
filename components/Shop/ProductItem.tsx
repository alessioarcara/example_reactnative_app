import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainButton from "../UI/MainButton";

type ProductItemProps = {
  image: string;
  imagePressHandler?: () => void;
  title: string;
  price: number;
  leftButtonTitle: string;
  leftButtonPressHandler: () => void;
  rightButtonTitle: string;
  rightButtonPressHandler: () => void;
};

const ProductItem = ({
  image,
  imagePressHandler,
  title,
  price,
  leftButtonTitle,
  leftButtonPressHandler,
  rightButtonTitle,
  rightButtonPressHandler,
}: ProductItemProps) => {
  return (
    <View style={styles.productItem}>
      <View style={styles.productHeader}>
        <TouchableOpacity
          style={{ height: "100%" }}
          onPress={imagePressHandler}
        >
          <Image source={{ uri: image }} style={styles.bg} />
          <View style={styles.productTitle}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.productRow}>
        <MainButton
          style={styles.productButton}
          onPress={leftButtonPressHandler}
        >
          {leftButtonTitle}
        </MainButton>
        <Text style={styles.price}>${price?.toFixed(2)}</Text>
        <MainButton
          style={styles.productButton}
          onPress={rightButtonPressHandler}
        >
          {rightButtonTitle}
        </MainButton>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productItem: {
    height: 250,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  productHeader: {
    height: "75%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bg: {
    flex: 1,
  },
  productTitle: {
    position: "absolute",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    bottom: 10,
    alignSelf: "center",
  },
  textTitle: {
    fontFamily: "open-sans-bold",
  },
  productRow: {
    height: "25%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  productButton: {
    width: 120,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "#888",
  },
});
