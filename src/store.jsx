import { configureStore } from "@reduxjs/toolkit";
import FoodItemReducer from "./features/ItemsSlice/ItemsSlice";

export const store = configureStore({
  reducer: {
    foodItems: FoodItemReducer,
  },
});
