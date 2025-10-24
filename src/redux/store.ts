import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import orderSlice from "./features/orderSlice";

// 1. Explicitly combine all your individual slices into the main reducer
const appReducer = combineReducers({
  product: productSlice,
  order: orderSlice,
});

// 2. Create a root reducer that handles the state reset logic
const rootReducer: typeof appReducer = (state, action) => {
  // For all other actions, proceed normally
  return appReducer(state, action);
};

// 3. Configure the store using the new rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Types for TypeScript (remain the same)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
