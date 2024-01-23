import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) =>
          item.product._id === action.payload.id &&
          item.size === action.payload.size
      );

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in cart!`
        );
      }

      state.items = newCart;
    },
    clearCart: (state) => {
      state.items = [];
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

export const selectCheckout = (state) => state.cart.checkout;

export const selectCartItemsWithId = createSelector(
  (state) => state,
  (_, id) => id,
  (state, id) => state.cart.items.filter((item) => item.id === id)
);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => (total += item.price), 0);

export default cartSlice.reducer;
