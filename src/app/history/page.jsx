import React, { useState, useEffect } from "react";
import { FaBox, FaSpinner } from "react-icons/fa";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("Chờ xác nhận");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "Chờ xác nhận", label: "Chờ xác nhận", color: "text-gray-600" },
    { id: "Đã xác nhận", label: "Đã xác nhận", color: "text-blue-600" },
    { id: "Đang giao hàng", label: "Đang giao hàng", color: "text-yellow-600" },
    { id: "Đã giao hàng", label: "Đã giao hàng", color: "text-green-600" },
    { id: "Đã hủy", label: "Đã hủy", color: "text-red-600" },
  ];

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyd7PKx8eVe2pE1YVLxaBEkiQ8pMwJBBP36gpchpd256VU0co8gVeXEZAxTx-uxgRfkLQ/exec";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const orderCodes = JSON.parse(localStorage.getItem("orders") || "[]");

      if (orderCodes.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${SCRIPT_URL}?orderCodes=${orderCodes.join(",")}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Không thể tải dữ liệu đơn hàng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOrders = () => {
    return orders.filter((order) => order.status === activeTab);
  };

  const getStatusBadgeColor = (status) => {
    const statusColors = {
      "Chờ xác nhận": "bg-gray-100 text-gray-800",
      "Đã xác nhận": "bg-blue-100 text-blue-800",
      "Đang giao hàng": "bg-yellow-100 text-yellow-800",
      "Đã giao hàng": "bg-green-100 text-green-800",
      "Đã hủy": "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return dateString;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const extractImageUrl = (imageString) => {
    if (!imageString) return "";
    if (
      imageString.startsWith("http://") ||
      imageString.startsWith("https://")
    ) {
      return imageString;
    }
    const hyperlinkMatch = imageString.match(
      /HYPERLINK\s*\(\s*"([^"]+)"\s*,\s*"[^"]*"\s*\)/i,
    );
    if (hyperlinkMatch && hyperlinkMatch[1]) {
      return hyperlinkMatch[1];
    }
    const urlMatch = imageString.match(/(https?:\/\/[^\s"']+)/i);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }

    console.log("URL found in image string:", imageString);

    return imageString;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBox className="text-green-600" />
            Lịch sử đơn hàng
          </h1>
          <p className="text-gray-600 mt-2">
            Theo dõi và quản lý các đơn hàng của bạn
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? `${tab.color} border-b-2 border-current bg-gray-50`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100">
                  {orders.filter((order) => order.status === tab.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FaSpinner className="animate-spin text-4xl text-green-600 mb-4" />
              <p className="text-gray-600">Đang tải đơn hàng...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Thử lại
              </button>
            </div>
          ) : getFilteredOrders().length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <FaBox className="text-6xl text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                Không có đơn hàng nào ở trạng thái này
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {getFilteredOrders().map((order, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={extractImageUrl(order.image)}
                        alt={order.productName}
                        className="w-full lg:w-32 h-32 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/128?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {order.productName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Mã đơn hàng:{" "}
                            <span className="font-medium text-gray-700">
                              {order.orderCode}
                            </span>
                          </p>
                        </div>
                        <span
                          className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Khách hàng:
                            </span>{" "}
                            {order.name}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Số điện thoại:
                            </span>{" "}
                            {order.phone}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Địa chỉ:
                            </span>{" "}
                            {order.address}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Ngày đặt đơn:
                            </span>{" "}
                            {formatDate(order.orderDate)}
                          </p>
                          {order.deliveryDate && (
                            <p className="text-gray-600">
                              <span className="font-medium text-gray-900">
                                Ngày giao đơn:
                              </span>{" "}
                              {formatDate(order.deliveryDate)}
                            </p>
                          )}
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Phương thức thanh toán:
                            </span>{" "}
                            {order.paymentMethod === "cod"
                              ? "Thanh toán khi nhận hàng"
                              : "Thanh toán online"}
                          </p>
                        </div>
                      </div>

                      {order.note && (
                        <div className="mt-3 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-900">
                              Ghi chú:
                            </span>{" "}
                            {order.note}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-lg font-semibold text-green-600">
                          {parseInt(order.price).toLocaleString("vi-VN")} VNĐ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
