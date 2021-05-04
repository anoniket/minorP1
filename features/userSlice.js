import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userType: null,
    userData: null,
    dbId: null,
    profileData: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setDbID: (state, action) => {
      state.dbId = action.payload;
    },
    setUserData: (state, action) => {
      console.log(action.payload)
      state.userData = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    showData: (state, action) => {
      state.profileData = null;
    },
  },
});

export const {
  login,
  setDbID,
  setUserType,
  setUserData,
  logout,
  showData,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectShowData = (state) => state.user.profileData;
export const selectUserType = (state) => state.user.userType;
export const selectDbId = (state) => state.user.dbId;
export const selectUserData = (state) => state.user.userData;

export default userSlice.reducer;
