import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCreditCard,
  FaCheckCircle
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
    paymentMethod: 'cod',
    note: ''
  });

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

  const handleSubmit = e => {
    e.preventDefault();

    let orderCode = generateRandom5Digit();

    const updatedUserInfo = {
      ...userInfo,
      orderCode: orderCode,
      price: price || totalPrice
    };

    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbwkIN7-7VCuveRzEIAn8lHWPUODfHZZhbfl0mNNH6Cfob9uhB66Ej0OW0GWYEEVl-4mnw/exec';

    const formData = new URLSearchParams();
    formData.append('Name', e.target.fullname.value);
    formData.append('Address', e.target.address.value);
    formData.append('Phone', e.target.phone.value);
    formData.append('OrderCode', orderCode);
    formData.append('PaymentMethod', e.target.paymentMethod.value);
    formData.append('Note', e.target.note.value);
    formData.append('Price', price || totalPrice);
    formData.append('Image', url);
    formData.append('ProductName', name);

    fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: formData.toString()
    })
      .then(res => res.text())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));

    if (e.target.paymentMethod.value === 'banking') {
      navigate('/payment', {
        state: { ...updatedUserInfo }
      });
    } else {
      navigate('/order-success');
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
              className='w-full py-3 bg-[#C25C61] text-white rounded-lg hover:bg-blue-700 focus:outline-none flex items-center justify-center space-x-2 transition duration-300'
            >
              <FaCheckCircle className='h-5 w-5' />
              <span>Thanh toán</span>
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
