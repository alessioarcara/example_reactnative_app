import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import Colors from "../../constants/Colors";

type MainButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  styleButtonText?: TextStyle;
  isDisabled?: boolean;
};

const MainButton = ({
  children,
  onPress,
  style,
  styleButtonText,
  isDisabled,
}: MainButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={isDisabled}
    >
      <View
        style={
          isDisabled
            ? {
                ...styles.button,
                ...style,
                ...{ backgroundColor: "lightgrey", borderWidth: 0 },
              }
            : {
                ...styles.button,
                backgroundColor: Colors.accent,
                ...style,
              }
        }
      >
        <Text
          style={{
            ...styles.buttonText,
            color: isDisabled ? "black" : "white",
            ...styleButtonText,
          }}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    textAlign: "center",
  },
});
