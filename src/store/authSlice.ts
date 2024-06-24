import { userApp } from "@/context/UserCookiesContext";
import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

interface AuthState {
  isLoggedin: boolean;
}

const getUserFromCookies = (): boolean => {
  const cookies = new Cookies();
  const user = cookies.get(userApp);
  return !!user; // Devuelve true si hay un usuario, false de lo contrario
};

const initialState: AuthState = {
  isLoggedin: getUserFromCookies(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedin = true;
    },
    logout(state) {
      state.isLoggedin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
