import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./slices/alertSlice";
import { userSlice } from "./slices/userSlice";

export default configureStore({
    reducer:{
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
    }
})