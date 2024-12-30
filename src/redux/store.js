import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices/inventorySlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

export default store;
