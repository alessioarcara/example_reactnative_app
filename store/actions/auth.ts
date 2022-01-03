import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../auth";
import { RootState } from "..";

export const SET_AUTH_DATA = "SET_AUTH_DATA";

type authenticationResponse = {
  expiresIn: number;
  idToken: string;
  localId: string;
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

let timer: ReturnType<typeof setTimeout>;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime: number) => {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    timer = setTimeout(() => {
      dispatch(signoff());
    }, expirationTime);
  };
};

export const signoff =
  () => (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    dispatch(logout());
  };

export const signin =
  (authResponse: authenticationResponse) =>
  async (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    dispatch(setLogoutTimer(authResponse.expiresIn));
    dispatch(
      login({
        token: authResponse.idToken,
        userId: authResponse.localId,
      })
    );

    const expirationDate = new Date(
      new Date().getTime() + authResponse.expiresIn
    );
    saveDataToStorage(
      authResponse.idToken,
      authResponse.localId,
      expirationDate
    );
  };
