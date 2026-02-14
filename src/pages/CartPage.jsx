import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../utils/cartSlice";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();

  // GET NORMALIZED CART
  const { items, totalAmount } = useSelector((store) => store.cart);

  const cartItems = Object.values(items || {});

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
      <div>
        <button
          className="px-4 py-2 bg-red-500 rounded-md text-white"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
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
              <h3 className="font-semibold text-lg">{product.title}</h3>

              <p className="text-gray-500">₹{product.price}</p>
            </div>
          </div>

          {/* RIGHT SIDE - QUANTITY */}
          <div className="flex items-center border rounded">
            <button
              onClick={() => dispatch(removeFromCart(product._id))}
              className="px-4 py-2"
            >
              -
            </button>

            <span className="px-4">{product.quantity}</span>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="px-4 py-2"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="border border-m-2 w-1/5 text-center italic">
        Total Cart Value : <span className="font-bold text-gray-600">₹{totalAmount}</span>
      </div>

      <div className="w-full">
        <NavLink
          to="/checkout"
          className="block w-full py-2 bg-blue-600 rounded-md text-white font-bold text-center"
        >
          Checkout
        </NavLink>
      </div>
    </div>
  );
};

export default CartPage;
