import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    capitalFormIsVisible: false,
    transactionFormIsVisible: false,
  },
  reducers: {
    toggleCapitalForm(state) {
      state.capitalFormIsVisible = !state.capitalFormIsVisible;
    },
    toggleTransactionForm(state) {
      state.transactionFormIsVisible = !state.transactionFormIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
