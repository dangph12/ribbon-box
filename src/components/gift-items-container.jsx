import { useSelector } from 'react-redux';
import DraggableGiftItem from './draggable-gift-item';

const GiftItemsContainer = () => {
  const { items, loading, error } = useSelector(state => state.giftItems);

  if (loading) {
    return (
      <div className='w-64 bg-white border-r border-gray-200 p-4'>
        <h3 className='text-lg font-semibold mb-4'>Gift Items</h3>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-64 bg-white border-r border-gray-200 p-4'>
        <h3 className='text-lg font-semibold mb-4'>Gift Items</h3>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className='w-64 min-w-64 max-w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto overflow-x-hidden flex-shrink-0'>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>Gift Items</h3>
      <div className='space-y-3'>
        {items.map(item => (
          <DraggableGiftItem key={item.id} item={item} />
        ))}
      </div>
      <div className='mt-6 text-xs text-gray-500'>
        <p>Drag items to the canvas to design your gift box</p>
      </div>
    </div>
  );
};

export default GiftItemsContainer;
