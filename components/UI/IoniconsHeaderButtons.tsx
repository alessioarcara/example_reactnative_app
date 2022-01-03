import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  HeaderButton,
  HeaderButtons,
  HeaderButtonProps,
  HeaderButtonsProps,
} from "react-navigation-header-buttons";

const IoniconHeaderButton = (props: HeaderButtonProps) => {
  return (
    <HeaderButton
      {...props}
      title=""
      IconComponent={Ionicons}
      iconSize={props?.iconSize ?? 26}
      color={props?.color ?? "white"}
    />
  );
};

const IoniconsHeaderButtons = (props: HeaderButtonsProps) => {
  return (
    <HeaderButtons HeaderButtonComponent={IoniconHeaderButton}>
      {props.children}
    </HeaderButtons>
  );
};

export default IoniconsHeaderButtons;
