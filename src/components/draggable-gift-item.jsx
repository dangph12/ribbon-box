import { useDraggable } from '@dnd-kit/core';

const DraggableGiftItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: item
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        position: isDragging ? 'fixed' : 'relative',
        zIndex: isDragging ? 1000 : 'auto',
        pointerEvents: isDragging ? 'none' : 'auto'
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-blue-100 border-2 border-blue-300 rounded-lg p-4 cursor-grab active:cursor-grabbing
        hover:bg-blue-200 transition-colors duration-200
        ${isDragging ? 'ring-2 ring-blue-400 ring-opacity-75' : ''}
        ${isDragging ? 'w-auto' : 'w-full'}
      `}
    >
      <div className='text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-md mx-auto mb-2 flex items-center justify-center overflow-hidden'>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name || `Item ${item.id}`}
              className='w-full h-full object-cover rounded-md'
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className='w-full h-full bg-blue-500 rounded-md flex items-center justify-center text-white font-bold'
            style={{ display: item.image ? 'none' : 'flex' }}
          >
            {item.id.replace('item-', '')}
          </div>
        </div>
        <p className='text-xs text-gray-700 font-medium'>
          {item.name || `Item ${item.id.replace('item-', '')}`}
        </p>
        <p className='text-xs text-gray-500'>
          {item.width} x {item.height}
        </p>
      </div>
    </div>
  );
};

export default DraggableGiftItem;
