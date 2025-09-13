const ItemImage = ({
  item,
  fallbackClassName = '',
  textColorClass = 'text-gray-700'
}) => {
  const getItemId = () => {
    return item.originalId
      ? item.originalId.replace('item-', '')
      : item.id.replace('item-', '');
  };

  if (item.image) {
    return (
      <div className='w-full h-full relative'>
        <img
          src={item.image}
          alt={item.name || `Item ${getItemId()}`}
          className='w-full h-full object-cover rounded-lg'
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-bold ${fallbackClassName} ${textColorClass}`}
          style={{ display: 'none' }}
        >
          {getItemId()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-bold ${fallbackClassName} ${textColorClass}`}
    >
      {getItemId()}
    </div>
  );
};

export default ItemImage;
