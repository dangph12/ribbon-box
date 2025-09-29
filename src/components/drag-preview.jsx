import ItemImage from './item-image';

const DragPreview = ({ item, gridSize }) => {
  if (!item) return null;

  const width = item.width * gridSize;
  const height = item.height * gridSize;

  return (
    <div
      className='bg-blue-200 border-2 border-blue-400 rounded-lg opacity-90 flex items-center justify-center shadow-lg overflow-hidden'
      style={{
        width: width,
        height: height,
        pointerEvents: 'none'
      }}
    >
      <div className='w-full h-full flex items-center justify-center'>
        <ItemImage
          item={item}
          fallbackClassName='bg-blue-300'
          textColorClass='text-blue-700'
        />
      </div>
    </div>
  );
};

export default DragPreview;
