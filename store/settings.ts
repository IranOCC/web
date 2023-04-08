import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { Settings } from "@/types/interfaces";


export interface stateType {
    settings: Settings | null
}


const initialState: stateType = {
    settings: null
}



// ====>

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Settings | null>) => {
            state.settings = action.payload
        },
    }
})



export const { setSettings } = settingsSlice.actions
export default settingsSlice.reducer