import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCreditCard,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';

const DesignPreview = () => {
  const location = useLocation();
  const { name, url, price, totalPrice } = location.state || {};
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    fullname: '',
    address: '',
    phone: '',
    orderCode: '',
    paymentMethod: 'banking',
    note: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const generateRandom5Digit = () => {
    return Math.floor(10000 + Math.random() * 90000);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let orderCode = generateRandom5Digit();

      const updatedUserInfo = {
        ...userInfo,
        orderCode: orderCode,
        price: price || totalPrice
      };

      const orderData = {
        fullname: e.target.fullname.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        orderCode: orderCode,
        paymentMethod: e.target.paymentMethod.value,
        note: e.target.note.value,
        price: price || totalPrice,
        image: url,
        productName: name
      };

      if (e.target.paymentMethod.value === 'banking') {
        navigate('/payment', {
          state: { ...updatedUserInfo, orderData }
        });
      } else {
        navigate('/order-success', {
          state: { orderData }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-between p-8 space-x-8'>
      <div className='w-1/2 bg-white p-6 shadow-xl rounded-lg border border-gray-300'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Thông tin người nhận
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex items-center space-x-3'>
            <FaUserAlt className='h-6 w-6 text-[#C25C61]' />
            <div className='flex-1'>
              <label
                htmlFor='fullname'
                className='block text-sm font-medium text-gray-700'
              >
                Họ và tên người nhận
              </label>
              <input
                type='text'
                id='fullname'
                name='fullname'
                value={userInfo.fullname}
                onChange={handleChange}
                required
                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300'
              />
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaMapMarkerAlt className='h-6 w-6 text-[#C25C61]' />
            <div className='flex-1'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Địa chỉ giao hàng
              </label>
              <input
                type='text'
                id='address'
                name='address'
                value={userInfo.address}
                onChange={handleChange}
                required
                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300'
              />
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaPhoneAlt className='h-6 w-6 text-[#C25C61]' />
            <div className='flex-1'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Số điện thoại người nhận
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={userInfo.phone}
                onChange={handleChange}
                required
                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300'
              />
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaCreditCard className='h-6 w-6 text-[#C25C61]' />
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700'>
                Phương thức thanh toán
              </label>
              <select
                name='paymentMethod'
                value={userInfo.paymentMethod}
                onChange={handleChange}
                className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300'
              >
                <option value='banking'>Banking</option>
                <option value='cod'>COD</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor='note'
              className='block text-sm font-medium text-gray-700'
            >
              Ghi chú (Nếu có)
            </label>
            <textarea
              id='note'
              name='note'
              value={userInfo.note}
              onChange={handleChange}
              className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300'
              placeholder='Ví dụ: Giao hàng sau 5 giờ chiều'
            />
          </div>

          <div>
            <button
              type='submit'
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-lg focus:outline-none flex items-center justify-center space-x-2 transition duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#C25C61] hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className='h-5 w-5 animate-spin' />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle className='h-5 w-5' />
                  <span>Thanh toán</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className='w-1/2 bg-white p-6 shadow-xl rounded-lg border border-gray-300'>
        <h2 className='text-3xl font-semibold text-[#C25C61] text-center mb-6'>
          Thông tin hộp quà
        </h2>
        <img
          src={url}
          alt={name}
          className='w-full max-w-2xl max-h-96 mx-auto shadow-2xl rounded-lg'
          style={{ objectFit: 'contain' }}
        />
        <h3 className='text-xl font-semibold text-gray-700 mt-4'>{name}</h3>
        <p className='text-lg text-red-500 font-bold mt-2'>
          {(price || totalPrice).toLocaleString('vi-VN')}đ
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          Giá chưa bao gồm phí vận chuyển
        </p>
      </div>
    </div>
  );
};

export default DesignPreview;
