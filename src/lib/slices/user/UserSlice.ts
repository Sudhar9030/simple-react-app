import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserState = {
    userId?: string |  undefined
    accounts?: Set<String> | undefined
    theme: 'light' | 'dark';
}

const initialState: UserState = {
    theme: 'dark'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        },
        logout: (state) => {
            state = initialState
        }
    }
})