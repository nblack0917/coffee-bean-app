import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    photoURL: "",
    favorites: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFavorites: (state, action) => {
      state.user.favorites = action.payload;
    },
    addToFavories: (state, action) => {
      state.user.favorites = [...state.user.favorites, action.payload];
    },
    removeFromFavorites: (state, action) => {
      const index = state.user.favorites.findIndex(
        (item) => item.id === action.payload.id
      );

      let newFavorites = [...state.user.favorites];

      if (index >= 0) {
        newFavorites.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in favorites!`
        );
      }

      state.user.favorites = newFavorites;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavories, removeFromFavorites, setUser, setFavorites } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
