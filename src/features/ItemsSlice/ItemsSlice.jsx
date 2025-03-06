import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../../assets/assets";

const initialState = {
  foodItem: [],
  cartItem: {},
};

const FoodItemReducer = createSlice({
  name: "item",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload;
      if (!state.cartItem[itemId]) {
        state.cartItem[itemId] = 1;
      } else {
        state.cartItem[itemId] += 1;
      }
      // Add food item to foodItem array if it doesn't already exist
      const foodItem = food_list.find((item) => item._id === itemId);
      if (foodItem && !state.foodItem.some((item) => item._id === itemId)) {
        state.foodItem.push(foodItem);
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state.cartItem[itemId] > 0) {
        state.cartItem[itemId] -= 1;
        if (state.cartItem[itemId] === 0) {
          delete state.cartItem[itemId];
        }
      }
    },
  },
});

// Selector to calculate the total cart amount
export const getTotalCartAmount = (state) => {
  let totalAmount = 0;
  for (const item in state.foodItems.cartItem) {
    if (state.foodItems.cartItem[item] > 0) {
      const foodItem = food_list.find((product) => product._id === item);
      if (foodItem) {
        totalAmount += foodItem.price * state.foodItems.cartItem[item];
      }
    }
  }
  return totalAmount;
};

export const { addToCart, removeFromCart } = FoodItemReducer.actions;

export default FoodItemReducer.reducer;
