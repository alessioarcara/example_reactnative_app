import { useCallback, useReducer } from "react";

export enum FormActionType {
  UPDATE = "UPDATE",
}

type FormState<T> = {
  inputValues: {
    [K in keyof T]: string;
  };
  inputValidities: {
    [K in keyof T]: boolean;
  };
  formIsValid: boolean;
};

type FormAction = {
  type: FormActionType.UPDATE;
  payload: { value: string; isValid: boolean; input: string };
};

const createFormReducer =
  <T,>() =>
  (state: FormState<T>, { type, payload }: FormAction): FormState<T> => {
    switch (type) {
      case FormActionType.UPDATE:
        const updatedValues = {
          ...state.inputValues,
          [payload.input]: payload.value,
        };
        const updatedValidities = {
          ...state.inputValidities,
          [payload.input]: payload.isValid,
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
          if (updatedValidities[key] === false) {
            updatedFormIsValid = false;
            break;
          }
        }
        return {
          formIsValid: updatedFormIsValid,
          inputValues: updatedValues,
          inputValidities: updatedValidities,
        };
      default:
        return state;
    }
  };

// TODO: typesafe generics implementation of useForm
const useForm = <
  T extends {
    [key: string]: string;
  }
>(
  form: T
): [FormState<T>, (input: string, value: string, isValid: boolean) => void] => {
  const [formState, dispatchFormState] = useReducer(createFormReducer<T>(), {
    inputValues: {
      ...form,
    },
    inputValidities: Object.keys(form).reduce((acc, curr) => {
      return { ...acc, [curr]: form ? true : false };
    }, {} as Record<keyof T, boolean>),
    formIsValid: false,
  });

  const valueChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatchFormState({
        type: FormActionType.UPDATE,
        payload: { value, isValid, input },
      });
    },
    [dispatchFormState]
  );

  return [formState, valueChangeHandler];
};

export default useForm;
