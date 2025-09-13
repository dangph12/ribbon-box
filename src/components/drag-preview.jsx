const DragPreview = ({ item, gridSize }) => {
  if (!item) return null;

  const width = item.originalId ? item.size.width : item.width * gridSize;
  const height = item.originalId ? item.size.height : item.height * gridSize;

  return (
    <div
      className='bg-blue-200 border-2 border-blue-400 rounded-lg opacity-80 flex items-center justify-center shadow-lg overflow-hidden'
      style={{
        width: width,
        height: height
      }}
    >
      <div className='w-full h-full flex items-center justify-center'>
        {item.image ? (
          <div className='w-full h-full relative'>
            <img 
              src={item.image} 
              alt={item.name || `Item ${item.originalId || item.id}`}
              className='w-full h-full object-cover rounded'
              onError={(e) => {
                // Fallback to text display if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className='w-full h-full bg-blue-300 rounded flex items-center justify-center text-sm font-bold text-blue-700'
              style={{ display: 'none' }}
            >
              {item.originalId
                ? item.originalId.replace('item-', '')
                : item.id.replace('item-', '')}
            </div>
          </div>
        ) : (
          <div className='w-full h-full bg-blue-300 rounded flex items-center justify-center text-sm font-bold text-blue-700'>
            {item.originalId
              ? item.originalId.replace('item-', '')
              : item.id.replace('item-', '')}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragPreview;
