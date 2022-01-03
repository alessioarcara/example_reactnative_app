import React, { useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
import defaultStyles from "../constants/default-styles";
import { useAppDispatch } from "../store/hooks";
import { login, setDidTryToLogin } from "../store/auth";
import { signin } from "../store/actions/auth";

const StartupScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(setDidTryToLogin());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryToLogin());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(
        signin({ localId: userId, idToken: token, expiresIn: expirationTime })
      );
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={defaultStyles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({});
