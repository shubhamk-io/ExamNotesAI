import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },

        updateCredits: (state, action) => {
            if (state.userData !== null) {
                state.userData.credits = action.payload;
            }
        }
    }
});

export const { setUserData, updateCredits } = UserSlice.actions;
export default UserSlice.reducer;