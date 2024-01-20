import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feautures/userSlice";
import drinksReducer from "./feautures/drinksSlice";
import categoryReducer from "./feautures/categorySlice";
import cartReducer from "./feautures/cartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    drinks: drinksReducer,
    cart: cartReducer,
    category: categoryReducer,
  },
});
