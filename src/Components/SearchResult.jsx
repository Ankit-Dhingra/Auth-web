import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../utils/cartSlice";
import { getAllProducts } from "../services/product.service";

const SearchResult = () => {

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    search: searchValue,
    sortPrice: "",
  });

  // ⭐ Sync URL search param → filters
  useEffect(() => {

    setFilters(prev => ({
      ...prev,
      search: searchValue,
      page: 1
    }));

  }, [searchValue]);

  // ⭐ Fetch products when filters change
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await getAllProducts(filters);

        setProducts(res?.data?.data?.products || []);
        setTotalPages(res?.data?.data?.totalPages || 1);

      } catch (error) {
        console.log(error);
      }

    };

    fetchProducts();

  }, [filters]);

  const updateFilter = (key, value) => {

    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));

  };

  const togglePriceSort = () => {

    let nextSort = "";

    if (filters.sortPrice === "") nextSort = "high";
    else if (filters.sortPrice === "high") nextSort = "low";

    updateFilter("sortPrice", nextSort);
  };

  // CART
  const cartItems = useSelector(store => store.cart.items);

  const getQuantity = (productId) => {

    return cartItems[productId]?.quantity || 0;

  };

  return (

    <div className="px-4">

      <div className="flex justify-between flex-wrap gap-4">

        <div>
          <h2 className="text-2xl font-bold mt-4">Search Results</h2>
          <p className="text-gray-600">Results for: {searchValue}</p>
        </div>

        <button
          onClick={togglePriceSort}
          className="border rounded px-3 py-2"
        >
          Price:
          {filters.sortPrice === "high"
            ? " High → Low"
            : filters.sortPrice === "low"
            ? " Low → High"
            : " None"}
        </button>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-4 gap-6 mt-6">

        {products.map(product => {

          const quantity = getQuantity(product._id);

          return (

            <div key={product._id} className="border p-4 rounded">

              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              <h3>{product.title}</h3>

              <p>₹{product.price}</p>

              {quantity === 0 ? (

                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-blue-500 text-white py-2 rounded"
                >
                  Add To Cart
                </button>

              ) : (

                <div className="flex justify-between border rounded">

                  <button onClick={() => dispatch(removeFromCart(product._id))}>-</button>

                  <span>{quantity}</span>

                  <button onClick={() => dispatch(addToCart(product))}>+</button>

                </div>

              )}

            </div>

          );

        })}

      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-6">

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
            className={`px-3 py-1 border ${
              filters.page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

    </div>

  );
};

export default SearchResult;
