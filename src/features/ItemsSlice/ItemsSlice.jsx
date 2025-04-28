import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/assets";

const initialState = {
  cartItems: {},
  isAuthenticated: false,
  foodList: food_list
};

const storeSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
        if (state.cartItems[itemId] === 0) {
          delete state.cartItems[itemId];
        }
      }
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

// Selector to calculate the total cart amount
export const getTotalCartAmount = (state) => {
  let totalAmount = 0;

  // Loop through the keys (item IDs) in cartItems
  for (const itemId in state.cartItems) {
    if (state.cartItems[itemId] > 0) {
      const itemInfo = state.foodList.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * state.cartItems[itemId];
      }
    }
  }

  return totalAmount;
};

export const { addToCart, removeFromCart, setAuthenticated } = storeSlice.actions;

export default storeSlice.reducer;
