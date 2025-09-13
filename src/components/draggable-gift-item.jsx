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
        <div className='w-12 h-12 bg-blue-500 rounded-md mx-auto mb-2 flex items-center justify-center text-white font-bold'>
          {item.id.replace('item-', '')}
        </div>
        <p className='text-sm text-gray-700'>
          {item.width} x {item.height}
        </p>
      </div>
    </div>
  );
};

export default DraggableGiftItem;
