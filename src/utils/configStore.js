import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Subscribe to store changes
appStore.subscribe(() => {
  const state = appStore.getState();

  localStorage.setItem("cart", JSON.stringify(state.cart));
});

export default appStore;
