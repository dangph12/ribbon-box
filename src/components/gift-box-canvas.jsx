import { useSelector, useDispatch } from 'react-redux';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import {
  removeItemFromCanvas,
  selectItem,
  deselectItem
} from '../store/features/gift-box-slice';

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

const GiftBoxCanvas = ({ activeItem, dragOverCanvas, dragPosition }) => {
  const dispatch = useDispatch();
  const { canvasItems, canvasSize, gridSize, showGrid, selectedItemId } =
    useSelector(state => state.giftBox);

  const [dropIndicator, setDropIndicator] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 }
  });

  const { setNodeRef } = useDroppable({
    id: 'canvas'
  });

  const handleCanvasClick = () => {
    if (selectedItemId) {
      dispatch(deselectItem());
    }
  };

  // Update drop indicator visibility when drag state changes
  useEffect(() => {
    if (dragOverCanvas && activeItem && dragPosition) {
      const itemWidth = activeItem.originalId
        ? activeItem.size.width
        : activeItem.width * gridSize;
      const itemHeight = activeItem.originalId
        ? activeItem.size.height
        : activeItem.height * gridSize;

      setDropIndicator(prev => ({
        ...prev,
        isVisible: true,
        size: { width: itemWidth, height: itemHeight }
      }));
    } else {
      setDropIndicator(prev => ({ ...prev, isVisible: false }));
    }
  }, [dragOverCanvas, activeItem, gridSize, dragPosition]);

  // Update drop indicator position in real-time based on drag position
  useEffect(() => {
    if (dragOverCanvas && activeItem && dragPosition) {
      const itemWidth = activeItem.originalId
        ? activeItem.size.width
        : activeItem.width * gridSize;
      const itemHeight = activeItem.originalId
        ? activeItem.size.height
        : activeItem.height * gridSize;

      // Snap to grid
      const snappedX = Math.round(dragPosition.x / gridSize) * gridSize;
      const snappedY = Math.round(dragPosition.y / gridSize) * gridSize;

      // Constrain within canvas bounds
      const constrainedX = Math.max(
        0,
        Math.min(snappedX, canvasSize.width - itemWidth)
      );
      const constrainedY = Math.max(
        0,
        Math.min(snappedY, canvasSize.height - itemHeight)
      );

      setDropIndicator(prev => ({
        ...prev,
        position: {
          x: constrainedX,
          y: constrainedY
        }
      }));
    }
  }, [dragPosition, dragOverCanvas, activeItem, gridSize, canvasSize]);

  return (
    <div className='flex-1 bg-gray-50 p-6 overflow-auto'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-800'>Gift Box Canvas</h2>
        <div className='flex items-center space-x-4'>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={showGrid}
              onChange={() => dispatch({ type: 'giftBox/toggleGrid' })}
              className='rounded'
            />
            <span className='text-sm text-gray-600'>Show Grid</span>
          </label>
          <button
            onClick={() => dispatch({ type: 'giftBox/clearCanvas' })}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm border border-gray-200 inline-block'>
        <div
          ref={setNodeRef}
          className='relative bg-white'
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            minWidth: canvasSize.width,
            minHeight: canvasSize.height
          }}
          onClick={handleCanvasClick}
        >
          <GridOverlay
            gridSize={gridSize}
            canvasSize={canvasSize}
            showGrid={showGrid}
          />

          <DropIndicator
            position={dropIndicator.position}
            size={dropIndicator.size}
            isVisible={dropIndicator.isVisible && dragOverCanvas}
          />

          {canvasItems.map(item => (
            <CanvasItem key={item.id} item={item} />
          ))}

          {canvasItems.length === 0 && (
            <div className='absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none'>
              <div className='text-center'>
                <div className='text-lg mb-2'>🎁</div>
                <div>Drag gift items here to design your gift box</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftBoxCanvas;
