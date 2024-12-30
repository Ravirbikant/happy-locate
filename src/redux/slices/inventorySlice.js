import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRooms: [],
  inventoryByRoom: {},
  inventoryByCategory: {},
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.selectedRooms.push(action.payload);
    },
    updateInventory: (state, action) => {
      const { room, item, quantity } = action.payload;
      if (!state.inventoryByRoom[room]) {
        state.inventoryByRoom[room] = {};
      }
      state.inventoryByRoom[room][item] = quantity;
    },
    updateCategoryInventory: (state, action) => {
      const { category, item, quantity } = action.payload;
      if (!state.inventoryByCategory[category]) {
        state.inventoryByCategory[category] = {};
      }
      state.inventoryByCategory[category][item] = quantity;
    },
  },
});

export const { addRoom, updateInventory, updateCategoryInventory } =
  inventorySlice.actions;
export default inventorySlice.reducer;
