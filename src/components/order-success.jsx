import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router';
import { useEffect, useState, useRef } from 'react';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWritingToSheets, setIsWritingToSheets] = useState(false);
  const [sheetsWriteComplete, setSheetsWriteComplete] = useState(false);
  const hasWrittenRef = useRef(false);

  const writeToGoogleSheets = async orderData => {
    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbzgw072uNsmmzW3i6bnP2h9M7b98myFv8lSdhulWweTfJdAcZJZLOD-IwZ5dx6eB_o0pQ/exec';

    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${currentDate.getFullYear()}`;

    const formData = new URLSearchParams();
    formData.append('Name', orderData.fullname);
    formData.append('Address', `${orderData.address}`);
    formData.append('Phone', `'${orderData.phone}`);
    formData.append('OrderCode', `${orderData.orderCode}`);
    formData.append('PaymentMethod', orderData.paymentMethod);
    formData.append('Note', orderData.note);
    formData.append('Price', orderData.price);
    formData.append('Image', `=HYPERLINK("${orderData.image}","View Image")`);
    formData.append('ProductName', orderData.productName);
    formData.append('Date', formattedDate);

    return fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: formData.toString()
    });
  };

  useEffect(() => {
    const handleSuccessfulPayment = async () => {
      try {
        if (
          location.state &&
          location.state.orderData &&
          !sheetsWriteComplete &&
          !isWritingToSheets &&
          !hasWrittenRef.current
        ) {
          hasWrittenRef.current = true;
          const orderData = location.state.orderData;

          setIsWritingToSheets(true);

          await writeToGoogleSheets(orderData);

          setSheetsWriteComplete(true);
          setIsWritingToSheets(false);
        }
      } catch (error) {
        console.error('Failed to write order data to Google Sheets:', error);
        setIsWritingToSheets(false);
      }
    };

    handleSuccessfulPayment();
  }, [location.state]);

  return (
    <div className='flex flex-col justify-center items-center py-12 px-6 sm:px-8'>
      <div className='bg-white rounded-lg shadow-xl w-full sm:w-3/4 md:w-2/3 p-8'>
        <div className='flex items-center gap-3 text-green-600 mb-6'>
          <FaCheckCircle size={26} />
          <h1 className='text-2xl font-bold'>Đặt hàng thành công!</h1>
        </div>

        <p className='text-center text-lg text-gray-700 mb-6'>
          Cảm ơn bạn đã mua sắm tại Ribbon Box. Đơn hàng của bạn đang được xử
          lý.
        </p>

        {isWritingToSheets && (
          <div className='text-center mb-4'>
            <p className='text-sm text-blue-600'>
              Đang lưu thông tin đơn hàng...
            </p>
          </div>
        )}

        {sheetsWriteComplete && (
          <div className='text-center mb-4'>
            <p className='text-sm text-green-600'>
              ✓ Thông tin đơn hàng đã được lưu thành công
            </p>
          </div>
        )}

        <div className='flex justify-center mt-6'>
          <button
            onClick={() => navigate('/')}
            className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md font-medium transition duration-300'
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
