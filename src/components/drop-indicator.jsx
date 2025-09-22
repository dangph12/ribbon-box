const DropIndicator = ({ position, size, isVisible, isValid = true }) => {
  if (!isVisible) return null;

  const borderColor = isValid ? 'border-blue-500' : 'border-red-500';
  const bgColor = isValid ? 'bg-blue-100' : 'bg-red-100';
  const textColor = isValid ? 'text-blue-600' : 'text-red-600';
  const message = isValid ? 'Drop here' : 'Cannot drop';

  return (
    <div
      className={`absolute border-2 border-dashed ${borderColor} ${bgColor} bg-opacity-50 rounded-lg pointer-events-none z-20 animate-pulse`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
      }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${textColor} text-sm font-medium`}
      >
        <div className='bg-white bg-opacity-80 px-2 py-1 rounded text-xs'>
          {message}
        </div>
      </div>
    </div>
  );
};

export default DropIndicator;
