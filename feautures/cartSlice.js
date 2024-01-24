import { createSelector, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  items: [],
  cartItemNumber: 0,
  checkout: {
    id: null,
    items: [],
    subtotal: null,
    tax: null,
    total: null,
    paymentMethod: null,
    last4Digits: null,
    paymentStatus: null,
    timestamp: null,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.size === action.payload.size &&
          _.isEqual(item.options, action.payload.options)
      );
      let newCart = [...state.items];
      if (index >= 0) {
        newCart[index].quantity = newCart[index].quantity + 1;
      } else {
        newCart = [...newCart, action.payload];
      }
      state.items = newCart;
      state.cartItemNumber++;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.size === action.payload.size &&
          _.isEqual(item.options, action.payload.options)
      );

      let newCart = [...state.items];

      if (index >= 0) {
        if (newCart[index].quantity === 1) {
          newCart.splice(index, 1);
        } else {
          newCart[index].quantity = newCart[index].quantity - 1;
        }
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in cart!`
        );
      }

      state.items = newCart;
      state.cartItemNumber--;
    },
    clearCart: (state) => {
      state.items = [];
      state.cartItemNumber = 0;
    },
    addToCheckout: (state, action) => {
      state.checkout = action.payload.checkout;
    },
    completeCheckout: (state, action) => {
      let tempCheckout = state.checkout;
      tempCheckout.paymentMethod = action.payload.paymentMethod;
      tempCheckout.last4Digits = action.payload.last4Digits;
      tempCheckout.paymentStatus = action.payload.last4Digits;
      //   tempCheckout.timestamp = new Date();
      state.checkout = tempCheckout;
    },
    clearCheckout: (state) => {
      state.checkout = {
        id: null,
        items: [],
        subtotal: null,
        tax: null,
        total: null,
        paymentMethod: null,
        last4Digits: null,
        paymentStatus: null,
        timestamp: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  clearCart,
  addToCheckout,
  completeCheckout,
  clearCheckout,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemNumber = (state) => state.cart.cartItemNumber;

export const selectCheckout = (state) => state.cart.checkout;

export const selectCartItemsWithId = createSelector(
  (state) => state,
  (_, id) => id,
  (state, id) => state.cart.items.filter((item) => item.id === id)
);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => (total += item.price), 0);

export default cartSlice.reducer;
