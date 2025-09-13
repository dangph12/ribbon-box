const DragPreview = ({ item, gridSize }) => {
  if (!item) return null;

  const width = item.originalId ? item.size.width : item.width * gridSize;
  const height = item.originalId ? item.size.height : item.height * gridSize;

  return (
    <div
      className='bg-blue-200 border-2 border-blue-400 rounded-lg opacity-80 flex items-center justify-center shadow-lg'
      style={{
        width: width,
        height: height
      }}
    >
      <div className='text-center pointer-events-none'>
        <div className='text-sm font-bold text-blue-700'>
          {item.originalId
            ? item.originalId.replace('item-', '')
            : item.id.replace('item-', '')}
        </div>
      </div>
    </div>
  );
};

export default DragPreview;
