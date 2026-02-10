import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";

const Checkout = () => {
  const { items, totalAmount } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispactch = useDispatch();

  const handlePlaceOrder = () => {
    try {
      dispactch(clearCart());
      navigate("/order-success");
    } catch (error) {
      console.log(error);
    }
  };

  const cartItems = Object.values(items || {});
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE - FORM */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="First Name"
                className="border p-2 rounded-md"
              />
              <input
                placeholder="Last Name"
                className="border p-2 rounded-md"
              />
            </div>

            <input
              placeholder="Address"
              className="w-full border p-2 rounded-md mt-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input placeholder="City" className="border p-2 rounded-md" />
              <input placeholder="State" className="border p-2 rounded-md" />
              <input placeholder="ZIP Code" className="border p-2 rounded-md" />
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Credit/Debit Card
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="space-y-4">
            {cartItems.map((product) => (
              <div key={product.id} className="flex gap-4 items-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.title}</h3>

                  <p className="text-gray-500 text-sm">
                    ₹{product.price} x {product.quantity}
                  </p>
                </div>

                <div className="font-semibold">
                  ₹{product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold mt-6 border-t pt-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
