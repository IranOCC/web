import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"


interface User {
    id: string,
    firstName: string,
    lastName: string,
}


export interface stateType {
    token: null | string,
    user: null | User,
}


const initialState: stateType = {
    token: null,
    user: null
}



// ====>

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
    }
})



export const { setToken } = authSlice.actions
export default authSlice.reducer