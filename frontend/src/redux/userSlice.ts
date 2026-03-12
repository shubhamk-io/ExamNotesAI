import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string
    name: string
    email: string
    credits: number
    role: string
    isCreditAvailable: boolean
}

interface UserState {
    userData: User | null
}

const initialState: UserState = {
    userData: null
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUserData: (state, action: PayloadAction<User>) => {
            state.userData = action.payload
        },

        updateCredits: (state, action: PayloadAction<number>) => {
            if (state.userData) {
                state.userData.credits = action.payload
            }
        }

    }
})

export const { setUserData, updateCredits } = UserSlice.actions

export default UserSlice.reducer