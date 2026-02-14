import { createSlice } from "@reduxjs/toolkit";

/*
==================================================
LOAD CART FROM LOCAL STORAGE
==================================================
*/

const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");

    if (!data) {
      return {
        items: {},
        totalQuantity: 0,
        totalAmount: 0,
      };
    }

    return JSON.parse(data);
  } catch (error) {
    return {
      items: {},
      totalQuantity: 0,
      totalAmount: 0,
    };
  }
};

/*
==================================================
SAVE CART TO LOCAL STORAGE
==================================================
*/

const saveCartToStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

/*
==================================================
INITIAL STATE
IMPORTANT:
Loader returns FULL cart state
NOT nested inside items
==================================================
*/

const initialState = loadCartFromStorage();

/*
==================================================
SLICE
==================================================
*/

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items[product._id];

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items[product._id] = {
          ...product,
          quantity: 1,
        };
      }

      state.totalQuantity += 1;
      state.totalAmount += product.price;

      saveCartToStorage(state);
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

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = {};
      state.totalQuantity = 0;
      state.totalAmount = 0;

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
