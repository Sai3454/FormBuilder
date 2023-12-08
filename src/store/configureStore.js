import { configureStore } from "@reduxjs/toolkit";
import FromsReducer from "./forms";
import error from "./middleware/error";
import api from "./middleware/api";

const store = configureStore({
    reducer: {
        forms: FromsReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        api,
        error,      
    ],
});

export default store;
