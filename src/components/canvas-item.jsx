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
    opacity: isDragging ? 0.7 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        absolute bg-green-100 border-2 rounded-lg cursor-move flex items-center justify-center
        ${
          isSelected
            ? 'border-blue-500 ring-2 ring-blue-300'
            : 'border-green-300'
        }
        ${isDragging ? 'z-50' : 'z-10'}
        hover:border-green-400 transition-colors duration-200
      `}
      onClick={handleClick}
      {...listeners}
      {...attributes}
    >
      <div className='text-center pointer-events-none'>
        <div className='text-sm font-bold text-green-700'>
          {item.originalId.replace('item-', '')}
        </div>
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
