import React, { useEffect, useState } from "react";
import { products } from "../assets/Data/product";
import { addToCart, removeFromCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../services/product.service";

const Trending = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  const dispatch = useDispatch();

  // GET CART FROM REDUX
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      const filter = {popularity : true};
      const products = await getAllProducts(filter);
      const res = products?.data?.data?.products;
      setTrendingProducts(
        res
      );
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-4">Trending Products</h2>

      <p className="text-gray-600 mb-6">Check out what's trending right now!</p>

      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4">
        {trendingProducts.map((product) => {
          // O(1) lookup (normalized cart)
          const cartItem = cartItems[product._id];
          const quantity = cartItem?.quantity || 0;

          return (
            <div
              key={product._id}
              className="min-w-[250px] border rounded-lg p-4 shrink-0"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover object-top mb-4 rounded-lg"
              />

              <h3 className="text-lg font-semibold">{product.title}</h3>

              <p className="text-gray-600 mb-3">₹{product.price}</p>

              {/* ADD TO CART / STEPPER */}
              {quantity === 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Add To Cart
                </button>
              ) : (
                <div className="flex justify-between border rounded">
                  <button
                    onClick={() => dispatch(removeFromCart(product._id))}
                    className="px-4 py-2"
                  >
                    -
                  </button>

                  <span className="py-2">{quantity}</span>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="px-4 py-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
