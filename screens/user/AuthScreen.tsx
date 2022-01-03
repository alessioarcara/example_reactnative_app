import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import { Card, Input, MainButton } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import { useLoginMutation, useSignupMutation } from "../../services/shopApi";
import useForm from "../../hooks/useForm";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackNavigatorParams } from "../../navigation/AuthNavigator";
import { useAppDispatch } from "../../store/hooks";
import { signin } from "../../store/actions/auth";

type AuthScreenProps = {
  navigation: StackNavigationProp<AuthStackNavigatorParams, "Authentication">;
};

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [signup, { isLoading: isSignup, error: failedToSignup }] =
    useSignupMutation({ fixedCacheKey: "auth" });
  const [login, { isLoading: isSignin, error: failedToLogin }] =
    useLoginMutation({ fixedCacheKey: "auth" });
  const [{ inputValues, inputValidities, formIsValid }, inputChangeHandler] =
    useForm({ email: "", password: "" });

  const dispatch = useAppDispatch();

  const isLoading = isSignin || isSignup;
  const hasErrors: any = useMemo(
    () => failedToLogin || failedToSignup,
    [failedToLogin, failedToSignup]
  );

  useEffect(() => {
    if (hasErrors) {
      console.log(hasErrors);
      Alert.alert(
        "An error occured!",
        JSON.stringify(hasErrors.data.error.message),
        [{ text: "Okay" }]
      );
    }
  }, [hasErrors]);

  const authHandler = () => {
    (isNewUser
      ? signup({ email: inputValues.email, password: inputValues.password })
      : login({ email: inputValues.email, password: inputValues.password })
    )
      .unwrap()
      .then((credentials) =>
        dispatch(
          signin({
            ...credentials,
            expiresIn: parseInt(credentials.expiresIn) * 1000,
          })
        )
      );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#fad38e", "#8dcdfa"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          {/* <ScrollView> */}
          <Input
            id="email"
            label="email"
            value={inputValues.email}
            onInputChange={inputChangeHandler}
            keyboardType="email-address"
            required
            autoCapitalize="none"
            email
            error={!inputValidities.email}
            errorText="Please enter a valid email address."
          />
          <Input
            id="password"
            label="password"
            value={inputValues.password}
            onInputChange={inputChangeHandler}
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            error={!inputValidities.password}
            errorText="Please enter a valid password."
          />
          {isLoading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <MainButton
              style={styles.button}
              styleButtonText={styles.buttonText}
              isDisabled={!formIsValid}
              onPress={authHandler}
            >
              {isNewUser ? "Register" : "Login"}
            </MainButton>
          )}
          <MainButton
            style={styles.button}
            styleButtonText={styles.buttonText}
            onPress={() => setIsNewUser((prevState) => !prevState)}
          >
            {isNewUser ? "Switch to Login" : "Switch to Register"}
          </MainButton>
          {/* </ScrollView> */}
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.accent,
    color: "black",
  },
  buttonText: {
    color: "black",
  },
});
