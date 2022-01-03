import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  userId: string | null;
  token: string | null;
  didTryLogin: boolean;
};

const initialState: AuthState = {
  userId: null,
  token: null,
  didTryLogin: false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setDidTryToLogin: (state) => ({
      ...state,
      didTryLogin: true,
    }),
    login: (state, { payload }) => ({
      userId: payload.userId,
      token: payload.token,
      didTryLogin: true,
    }),
    logout: () => ({
      ...initialState,
      didTryLogin: true,
    }),
  },
});

export const { login, logout, setDidTryToLogin } = authSlice.actions;
export default authSlice.reducer;
