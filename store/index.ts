import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth"
import settingsReducer from "./settings"
import optionsReducer from "./options"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        options: optionsReducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
