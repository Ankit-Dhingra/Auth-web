import React, { useEffect, useState } from "react";
import "./products.css";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 10;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;
  // const currentProducts = products.slice(startIndex, endIndex);
  const currentProducts = products;

  const noOfPages = Math.ceil(totalPages / PAGE_SIZE);
  console.log(noOfPages);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${startIndex}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  return !products.length ? (
    <div className="products-container">No products available</div>
  ) : (
    <div className="pagination-info flex flex-col items-center gap-4">
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} noOfPages={noOfPages} />
      <div className="products-container">
        {currentProducts.map((product) => {
         return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      
    </div>
  );
};

export default ProductsPage;
