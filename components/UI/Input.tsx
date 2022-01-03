import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { InputActionType, inputReducer } from "../../reducers/inputReducer";

type InputProps = {
  id: string;
  label: string;
  error: boolean;
  errorText: string;
  initialValue?: string;
  initiallyValid?: boolean;
  onInputChange: (input: string, value: string, isValid: boolean) => void;
  email?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
};

const Input = (props: InputProps & TextInputProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props?.initialValue ?? "",
    isValid: props?.initiallyValid ?? false,
    touched: false,
  });

  const { id, onInputChange } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange]);

  const valueChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({
      type: InputActionType.INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: InputActionType.INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={valueChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  error: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});
