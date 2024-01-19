import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  drink: {
    id: null,
    imgUrl: null,
    name: null,
    subtext: null,
    rating: null,
    type: null,
    description: null,
    roast: [],
    sizes: [],
    ingredients: [],
    addons: [],
    price: null,
  },
};

export const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    setDrink: (state, action) => {
      state.drink = action.payload;
    },
    removeDrink: (state) => {
      state.drink = {
        id: null,
        imgUrl: null,
        name: null,
        subtext: null,
        rating: null,
        type: null,
        description: null,
        roast: [],
        sizes: [],
        ingredients: [],
        addons: [],
        price: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDrink, removeDrink } = drinksSlice.actions;

export const selectDrink = (state) => state.drinks.drink;

export default drinksSlice.reducer;
