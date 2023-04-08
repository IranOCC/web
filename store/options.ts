import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"



export interface stateType {
    mobileMenuOpen: boolean
}


const initialState: stateType = {
    mobileMenuOpen: false
}



// ====>

const optionsSlice = createSlice({
    name: "options",
    initialState,
    reducers: {
        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.mobileMenuOpen = action.payload
        },
    }
})



export const { setMobileMenuOpen } = optionsSlice.actions
export default optionsSlice.reducer