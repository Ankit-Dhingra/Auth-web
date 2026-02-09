import React, { useState, useMemo } from "react";
import { products } from "../assets/Data/product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../utils/cartSlice";

const AllProducts = () => {
  const dispatch = useDispatch();

  // INITIAL FILTER STATE
  const initialFilters = {
    category: "",
    gender: "",
    sortPrice: "",
    popularity: false,
  };

  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const togglePriceSort = () => {
    let nextSort = "";

    if (filters.sortPrice === "") nextSort = "high";
    else if (filters.sortPrice === "high") nextSort = "low";
    else nextSort = "";

    updateFilter("sortPrice", nextSort);
  };

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.gender) {
      result = result.filter((p) => p.gender === filters.gender);
    }

    if (filters.popularity) {
      result = result.filter((p) => p.tags.includes("trending"));
    }

    if (filters.sortPrice === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (filters.sortPrice === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [filters]);

  // GET QUANTITY FROM CART
  const cartItems = useSelector((store) => store.cart.items);

  const getQuantity = (productId) => {
    return cartItems[productId]?.quantity || 0;
  };

  return (
    <div className="px-4">
      {/* HEADER (same as before) */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold mt-4">All Products</h2>
          <p className="text-gray-600">Explore our complete collection.</p>
        </div>

        {/* FILTER CONTROLS */}
        <div className="flex gap-3 flex-wrap">
          <select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Category</option>
            <option value="dress">Dress</option>
          </select>

          <select
            value={filters.gender}
            onChange={(e) => updateFilter("gender", e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          <button
            onClick={togglePriceSort}
            className="border rounded px-3 py-2"
          >
            Price:{" "}
            {filters.sortPrice === "high"
              ? "High → Low"
              : filters.sortPrice === "low"
                ? "Low → High"
                : "None"}
          </button>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => {
          const quantity = getQuantity(product.id);

          return (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover object-top mb-4 rounded-lg"
              />

              <h3 className="text-lg font-semibold">{product.title}</h3>

              <p className="text-gray-600 mb-3">₹{product.price}</p>

              {/* ADD / STEPPER */}
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
                    onClick={() => dispatch(removeFromCart(product.id))}
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

export default AllProducts;
