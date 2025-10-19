import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderDataParam = searchParams.get("orderData");

    if (orderDataParam) {
      try {
        const orderData = JSON.parse(decodeURIComponent(orderDataParam));

        navigate("/order-success", {
          state: { orderData },
        });
      } catch (error) {
        console.error("Failed to parse order data:", error);
        navigate("/order-failed");
      }
    } else {
      navigate("/order-failed");
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-[#C25C61]">
        Đang xử lý thanh toán...
      </h1>
      <p className="mt-4 text-gray-600">Vui lòng chờ trong giây lát.</p>
    </div>
  );
};

export default Checkout;
