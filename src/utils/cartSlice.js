import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data
      ? JSON.parse(data)
      : {
          items: {},
          totalQuantity: 0,
          totalAmount: 0,
        };
  } catch {
    return {
      items: {},
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

const initialState = {
  items: loadCartFromStorage(), // productId -> product
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items[product.id];

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items[product.id] = {
          ...product,
          quantity: 1,
        };
      }

      state.totalQuantity += 1;
      state.totalAmount += product.price;
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items[productId];

      if (!existingItem) return;

      existingItem.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalAmount -= existingItem.price;

      if (existingItem.quantity === 0) {
        delete state.items[productId];
      }
    },

    clearCart: () => initialState,
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
