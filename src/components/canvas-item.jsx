import { useSelector, useDispatch } from 'react-redux';
import { useDraggable } from '@dnd-kit/core';
import {
  removeItemFromCanvas,
  selectItem
} from '../store/features/gift-box-slice';

const CanvasItem = ({ item }) => {
  const dispatch = useDispatch();
  const selectedItemId = useSelector(state => state.giftBox.selectedItemId);
  const isSelected = selectedItemId === item.id;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: item
    });

  const handleClick = e => {
    e.stopPropagation();
    dispatch(selectItem(item.id));
  };

  const handleDelete = e => {
    e.stopPropagation();
    dispatch(removeItemFromCanvas(item.id));
  };

  const style = {
    left: item.position.x,
    top: item.position.y,
    width: item.size.width,
    height: item.size.height,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        absolute rounded-lg cursor-move flex items-center justify-center overflow-hidden
        ${
          isSelected
            ? 'ring-2 ring-blue-500 ring-offset-2'
            : ''
        }
        ${isDragging ? 'z-50' : 'z-10'}
        hover:ring-2 hover:ring-blue-300 hover:ring-offset-1 transition-all duration-200
      `}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      <div className='w-full h-full flex items-center justify-center'>
        {item.image ? (
          <div className='w-full h-full relative'>
            <img 
              src={item.image} 
              alt={item.name || `Item ${item.originalId}`}
              className='w-full h-full object-cover rounded-lg'
              onError={(e) => {
                // Fallback to text display if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className='w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-sm font-bold text-gray-700'
              style={{ display: 'none' }}
            >
              {item.originalId.replace('item-', '')}
            </div>
          </div>
        ) : (
          <div className='w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-sm font-bold text-gray-700'>
            {item.originalId.replace('item-', '')}
          </div>
        )}
      </div>

      {isSelected && (
        <button
          className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 pointer-events-auto'
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default CanvasItem;
