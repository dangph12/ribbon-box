const DropIndicator = ({ position, size, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className='absolute border-2 border-dashed border-blue-500 bg-blue-100 bg-opacity-50 rounded-lg pointer-events-none z-20 animate-pulse'
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
      }}
    >
      <div className='absolute inset-0 flex items-center justify-center text-blue-600 text-sm font-medium'>
        <div className='bg-white bg-opacity-80 px-2 py-1 rounded text-xs'>
          Drop here
        </div>
      </div>
    </div>
  );
};

export default DropIndicator;
