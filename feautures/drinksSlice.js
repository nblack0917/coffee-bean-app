import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDrinks: [],
  allBeans: [],
};

export const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    setAllDrinks: (state, action) => {
      state.allDrinks = action.payload;
    },
    setAllBeans: (state, action) => {
      state.allBeans = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllDrinks, setAllBeans } = drinksSlice.actions;

export const selectDrinks = (state) => state.drinks.allDrinks;
export const selectBeans = (state) => state.drinks.allBeans;

export default drinksSlice.reducer;
