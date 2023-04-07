import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { Session } from "next-auth";


export interface stateType {
    session: Session | null
}


const initialState: stateType = {
    session: null
}



// ====>

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session | null>) => {
            state.session = action.payload
        },
    }
})



export const { setSession } = authSlice.actions
export default authSlice.reducer