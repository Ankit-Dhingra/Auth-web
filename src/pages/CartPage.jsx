import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart
} from "../utils/cartSlice";

const CartPage = () => {

  const dispatch = useDispatch();

  // GET NORMALIZED CART
  const cartItemsObj = useSelector(
    (store) => store.cart.items
  );

  // Convert object → array for rendering
  const cartItems = Object.values(cartItemsObj);

  // Empty cart check
  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-xl font-semibold">
          Shop and add items to your cart 🙂
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-4">

      {cartItems.map((product) => (

        <div
          key={product.id}
          className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
        >

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {product.title}
              </h3>

              <p className="text-gray-500">
                ₹{product.price}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - QUANTITY */}
          <div className="flex items-center border rounded">

            <button
              onClick={() =>
                dispatch(removeFromCart(product.id))
              }
              className="px-4 py-2"
            >
              -
            </button>

            <span className="px-4">
              {product.quantity}
            </span>

            <button
              onClick={() =>
                dispatch(addToCart(product))
              }
              className="px-4 py-2"
            >
              +
            </button>

          </div>

        </div>

      ))}

    </div>
  );
};

export default CartPage;
