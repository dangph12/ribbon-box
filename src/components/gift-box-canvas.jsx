import { useSelector, useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import {
  deselectItem,
  saveDesignData,
  generateCanvasImage,
  clearCanvas
} from '../store/features/gift-box-slice';
import DropIndicator from './drop-indicator';
import CanvasItem from './canvas-item';
import GridOverlay from './grid-overlay';

const GiftBoxCanvas = ({ activeItem, dragOverCanvas, dragPosition }) => {
  const dispatch = useDispatch();
  const {
    canvasItems = [],
    canvasSize = { width: 800, height: 600 },
    gridSize = 20,
    showGrid = true,
    selectedItemId = null
  } = useSelector(state => state.giftBox || {});

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

  const handleSaveDesign = () => {
    dispatch(saveDesignData());
    dispatch(generateCanvasImage());

    setTimeout(() => {
      dispatch(clearCanvas());
    }, 500);
  };

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

  useEffect(() => {
    if (dragOverCanvas && activeItem && dragPosition) {
      const itemWidth = activeItem.originalId
        ? activeItem.size.width
        : activeItem.width * gridSize;
      const itemHeight = activeItem.originalId
        ? activeItem.size.height
        : activeItem.height * gridSize;

      const snappedX = Math.round(dragPosition.x / gridSize) * gridSize;
      const snappedY = Math.round(dragPosition.y / gridSize) * gridSize;

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
            onClick={handleSaveDesign}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200'
          >
            Save Design
          </button>
          <button
            onClick={() => dispatch(clearCanvas())}
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

          {canvasItems &&
            canvasItems.map(item => <CanvasItem key={item.id} item={item} />)}

          {(!canvasItems || canvasItems.length === 0) && (
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
