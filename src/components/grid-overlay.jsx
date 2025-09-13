const GridOverlay = ({ gridSize, canvasSize, showGrid }) => {
  if (!showGrid) return null;

  const verticalLines = [];
  const horizontalLines = [];

  for (let x = 0; x <= canvasSize.width; x += gridSize) {
    verticalLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={canvasSize.height}
        stroke='#e5e7eb'
        strokeWidth='0.5'
      />
    );
  }

  for (let y = 0; y <= canvasSize.height; y += gridSize) {
    horizontalLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={canvasSize.width}
        y2={y}
        stroke='#e5e7eb'
        strokeWidth='0.5'
      />
    );
  }

  return (
    <svg
      className='absolute inset-0 pointer-events-none z-0'
      width={canvasSize.width}
      height={canvasSize.height}
    >
      {verticalLines}
      {horizontalLines}
    </svg>
  );
};

export default GridOverlay;
