import { createSlice } from "@reduxjs/toolkit";

const passSlice = createSlice({
  name: "pass",
  initialState: { balance: 4500, validUntil: "28 juin 2026", trips: 5, spent: 1500 },
  reducers: {
    recharge: (state, action) => {
      state.balance += action.payload;
    },
  },
});

export const { recharge } = passSlice.actions;
export default passSlice.reducer;
