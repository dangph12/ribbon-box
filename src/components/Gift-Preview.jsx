import { useLocation } from "react-router";
import { useState } from "react";
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

const DesignPreview = () => {
  const location = useLocation();
  const { url } = location.state || {};

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "banking", 
    note: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Info Submitted:", userInfo);
  };

  if (!url) {
    return <div>No image found</div>;
  }

  return (
    <div className="flex justify-between p-8 space-x-8">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-[#C25C61] text-center mb-6">
          Gift Box Design Preview
        </h1>
        <img
          src={url}
          alt="Gift Box Design"
          className="w-full max-w-2xl mx-auto shadow-2xl rounded-lg"
        />
      </div>

      <div className="w-1/3 bg-white p-6 shadow-xl rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-3">
            <FaUserAlt className="h-6 w-6 text-[#C25C61]" />
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="h-6 w-6 text-[#C25C61]" />
            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="h-6 w-6 text-[#C25C61]" />
            <div className="flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FaCreditCard className="h-6 w-6 text-[#C25C61]" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={userInfo.paymentMethod}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              >
                <option value="banking">Banking</option>
                <option value="cod">COD</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Order Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              value={userInfo.note}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Any special instructions or requests?"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#C25C61] text-white rounded-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center space-x-2 transition duration-300"
            >
              <FaCheckCircle className="h-5 w-5" />
              <span>Submit Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignPreview;