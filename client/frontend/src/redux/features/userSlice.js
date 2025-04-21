import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {},
    isUserAuth: false,
    isAdminAuth: false,
    role:null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            const role = action.payload.role;
            state.role = role;
            if (role === "user") {
                state.isUserAuth = true;
                state.isAdminAuth = false;
                // state.isSellerAuth = false;
              } else if (role === "admin") {
                state.isAdminAuth = true;
                state.isUserAuth = false;
                // state.isSellerAuth = false;
              } 
        },
        clearUser: (state) => {
            state.userData={}
            state.isUserAuth = false;
            state.isAdminAuth = false;
            state.role=null
        },
    },
});


export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;