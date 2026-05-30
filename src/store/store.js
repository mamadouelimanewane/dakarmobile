import { configureStore } from "@reduxjs/toolkit";
import routesReducer from "./routesSlice";
import ticketsReducer from "./ticketsSlice";
import passReducer from "./passSlice";

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    tickets: ticketsReducer,
    pass: passReducer,
  },
});
