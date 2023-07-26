import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { capitalFormIsVisible: false },
  reducers: {
    toggleCapitalForm(state) {
      state.capitalFormIsVisible = !state.capitalFormIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
