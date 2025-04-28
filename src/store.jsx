import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storeSlice from "./features/ItemsSlice/ItemsSlice";
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";


const persistConfig = {
  key: "root:",
  storage,
  whitelist: ["foodItems"],
}

const rootReducer = combineReducers({
  foodItems: storeSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
