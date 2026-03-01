import React from "react";

const withDiscount = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    const { product } = props;

    return (
      <div className="relative">
        {/* If discount exists show badge */}
        {product.discountPercentage > 15 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "red",
              color: "white",
              padding: "4px 8px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            {product.discountPercentage}% OFF
          </span>
        )}

        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withDiscount;