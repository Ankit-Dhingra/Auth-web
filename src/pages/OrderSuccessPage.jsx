import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/my-orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col">

      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully 🎉
      </h1>

      <p className="mt-4">Redirecting to your orders...</p>

    </div>
  );
};

export default OrderSuccessPage;
