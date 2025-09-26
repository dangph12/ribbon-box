import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import CryptoJS from "crypto-js";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderCode } = location.state || {};

  const clientId = import.meta.env.VITE_PAYOS_CLIENT_ID;
  const apiKey = import.meta.env.VITE_PAYOS_API_KEY;
  const checksumKey = import.meta.env.VITE_PAYOS_CHECKSUM_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;

  const generateSignature = ({ amount, cancelUrl, description, orderCode, returnUrl }) => {
    const data = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;

    // Tạo signature bằng HMAC_SHA256
    const signature = CryptoJS.HmacSHA256(data, checksumKey).toString(CryptoJS.enc.Hex);

    return signature;
  };

  useEffect(() => {
    const createPayment = async () => {
      try {
        const body = {
          amount: 150000, // Fix cứng tiền, chỉnh sau
          orderCode: orderCode,
          description: `Đơn hàng ${orderCode}`,
          returnUrl: `${baseUrl}/order-success`,
          cancelUrl: `${baseUrl}/`,
          signature: generateSignature({ amount: 150000, cancelUrl: `${baseUrl}/`, description: `Đơn hàng ${orderCode}`, orderCode: orderCode, returnUrl: `${baseUrl}/order-success` }),
        };

        console.log("Payment body:", body);

        const res = await fetch("https://api-merchant.payos.vn/v2/payment-requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-client-id": clientId,
            "x-api-key": apiKey,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log("PayOS response:", data);

        if (data.data.checkoutUrl) {
          window.location.href = data.data.checkoutUrl;
        } else {
          console.error("No checkout URL returned from PayOS");
        }

      } catch (err) {
        console.error("Payment error:", err);
      }
    };

    if (orderCode) {
      createPayment();
    } else {
      console.error("Order code is missing!");
      // Chuyển hướng về trang trước hoặc hiển thị thông báo lỗi
      navigate("/"); // Ví dụ: chuyển hướng về trang chủ
      return;
    }
  }, [orderCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-[#C25C61]">
        Đang chuyển hướng đến PayOS...
      </h1>
      <p className="mt-4 text-gray-600">Vui lòng chờ trong giây lát.</p>
    </div>
  );
};

export default Payment;
