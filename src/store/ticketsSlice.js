import { createSlice } from "@reduxjs/toolkit";

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: { activeQR: null },
  reducers: {
    generateQR: (state, action) => {
      state.activeQR = action.payload;
    },
  },
});

export const { generateQR } = ticketsSlice.actions;
export default ticketsSlice.reducer;
