import React from "react";
import withDiscount from "./HOC"; // adjust path

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">
        {product.description.slice(0, 100)}...
      </p>
      <p className="product-price">${product.price}</p>
    </div>
  );
};

export default withDiscount(ProductCard);