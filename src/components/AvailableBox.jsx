import { useState } from 'react';
import { Link } from 'react-router';
import giftBoxes from '~/api/gift-boxes.json';

export default function AvailableBox() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);

  const filteredGiftBoxes = giftBoxes.filter(
    p => p.price >= minPrice && p.price <= maxPrice
  );

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6 text-[#AD3542]'>
        Các Sản Phẩm Được Thiết Kế Sẵn
      </h1>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='w-full md:w-1/4 border p-4 rounded-xl shadow-sm bg-white'>
          <h2 className='text-lg font-semibold mb-4 text-[#AD3542]'>
            Lọc Theo Giá
          </h2>

          <label className='text-sm text-gray-600'>
            Tối thiểu: {minPrice.toLocaleString('vi-VN')}đ
          </label>
          <input
            type='range'
            min='0'
            max='500000'
            step='50'
            value={minPrice}
            onChange={e => setMinPrice(Number(e.target.value))}
            className='w-full mb-4'
          />

          <label className='text-sm text-gray-600'>
            Tối đa: {maxPrice.toLocaleString('vi-VN')}đ
          </label>
          <input
            type='range'
            min='0'
            max='500000'
            step='50'
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className='w-full'
          />
        </div>

        <div className='w- md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]'>
          {filteredGiftBoxes.length > 0 ? (
            filteredGiftBoxes.map(product => (
              <div
                key={product.id}
                className='border rounded-2xl shadow-lg p-4 min-h-[320px] flex flex-col justify-between'
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className='rounded-xl mb-3 w-full'
                />
                <h2 className='text-lg font-semibold text-[#AD3542]'>
                  {product.name}
                </h2>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='text-red-500 font-bold'>
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className='line-through text-gray-500'>
                    {product.oldPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className='bg-yellow-200 text-yellow-800 px-2 rounded text-xs'>
                    {product.discount}%
                  </span>
                </div>
                <button className='mt-4 w-full bg-[#AD3542] text-[#FFFDF1] py-2 rounded-xl'>
                  <Link to={`/preview`}>Chọn Mẫu Này</Link>
                </button>
              </div>
            ))
          ) : (
            <div className='w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px] text-black'>
              Không tìm thấy sản phẩm phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
