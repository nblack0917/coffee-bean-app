import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "All",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory } = categorySlice.actions;

export const selectCategory = (state) => state.category.category;

export default categorySlice.reducer;
