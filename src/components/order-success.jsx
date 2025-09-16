import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center py-12 px-6 sm:px-8">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 p-8">
        <div className="flex items-center gap-3 text-green-600 mb-6">
          <FaCheckCircle size={26} />
          <h1 className="text-2xl font-bold">Đặt hàng thành công!</h1>
        </div>

        <p className="text-center text-lg text-gray-700 mb-6">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn
          đang được xử lý.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition duration-300"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
