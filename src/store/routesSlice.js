import { createSlice } from "@reduxjs/toolkit";

const routesSlice = createSlice({
  name: "routes",
  initialState: [],
  reducers: {
    setRoutes: (state, action) => action.payload,
  },
});

export const { setRoutes } = routesSlice.actions;
export default routesSlice.reducer;
