import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const OrderFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center py-12 px-6 sm:px-8">
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 p-8">
        <div className="flex items-center gap-3 text-red-600 mb-6">
          <FaTimes size={26} />
          <h1 className="text-2xl font-bold">Đã có lỗi xảy ra với đơn hàng!</h1>
        </div>

        <p className="text-center text-lg text-gray-700 mb-6">
          Rất tiếc, đã có lỗi xảy ra trong quá trình xử lý đơn hàng của bạn. Vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ khách hàng.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition duration-300"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailedPage;
