import { useSelector, useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  deselectItem,
  saveDesignData,
  clearCanvas
} from '../store/features/gift-box-slice';
import DropIndicator from './drop-indicator';
import CanvasItem from './canvas-item';
import GridOverlay from './grid-overlay';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const GiftBoxCanvas = ({ activeItem, dragOverCanvas, dragPosition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    canvasItems = [],
    canvasSize = { width: 800, height: 600 },
    gridSize = 20,
    showGrid = true,
    selectedItemId = null,
    totalPrice = 0
  } = useSelector(state => state.giftBox || {});

  const [dropIndicator, setDropIndicator] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    isValid: true
  });

  const [isLoading, setIsLoading] = useState(false);

  const checkPositionValid = (
    position,
    draggedItem,
    canvasItems,
    canvasSize,
    gridSize
  ) => {
    if (!draggedItem || !position) return true;

    const itemWidth = draggedItem.originalId
      ? draggedItem.size.width
      : (draggedItem.width || 4) * gridSize;
    const itemHeight = draggedItem.originalId
      ? draggedItem.size.height
      : (draggedItem.height || 4) * gridSize;

    if (
      position.x < 0 ||
      position.y < 0 ||
      position.x + itemWidth > canvasSize.width ||
      position.y + itemHeight > canvasSize.height
    ) {
      return false;
    }

    const newLeft = position.x;
    const newTop = position.y;
    const newRight = newLeft + itemWidth;
    const newBottom = newTop + itemHeight;

    return !canvasItems.some(item => {
      const existingLeft = item.position.x;
      const existingTop = item.position.y;
      const existingRight = existingLeft + item.size.width;
      const existingBottom = existingTop + item.size.height;

      return !(
        newRight <= existingLeft ||
        newLeft >= existingRight ||
        newBottom <= existingTop ||
        newTop >= existingBottom
      );
    });
  };

  const { setNodeRef } = useDroppable({
    id: 'canvas'
  });

  const handleCanvasClick = () => {
    if (selectedItemId) {
      dispatch(deselectItem());
    }
  };

  const handleSaveDesign = async () => {
    setIsLoading(true);

    try {
      dispatch(saveDesignData());

      const blob = await generateCanvasImage();
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await response.json();
      console.log('Cloudinary upload response:', data);

      if (!blob) return;

      const url = data.secure_url;
      console.log('Navigating to /preview with url:', url);

      const name = `Hộp quà tự thiết kế`;

      navigate('/preview', { state: { name, url, totalPrice } });

      setTimeout(() => {
        dispatch(clearCanvas());
      }, 500);
    } catch (err) {
      console.error('Payment process error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCanvasImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';

    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= canvasSize.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize.height);
        ctx.stroke();
      }

      for (let y = 0; y <= canvasSize.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize.width, y);
        ctx.stroke();
      }
    }

    if (canvasItems && Array.isArray(canvasItems)) {
      const loadImagePromises = canvasItems.map(item => {
        return new Promise(resolve => {
          const x = item.position.x;
          const y = item.position.y;
          const width = item.size.width;
          const height = item.size.height;

          if (item.image) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              try {
                ctx.save();

                const radius = 8;
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, radius);
                ctx.clip();

                ctx.drawImage(img, x, y, width, height);

                ctx.restore();
              } catch (error) {
                console.warn('Error drawing image:', error);
                drawFallbackBackground();
              }
              resolve();
            };
            img.onerror = () => {
              console.warn('Failed to load image:', item.image);
              drawFallbackBackground();
              resolve();
            };
            img.src = item.image;

            function drawFallbackBackground() {
              ctx.fillStyle = '#e5e7eb';
              ctx.strokeStyle = '#d1d5db';
              ctx.lineWidth = 2;

              const radius = 8;
              ctx.beginPath();
              ctx.roundRect(x, y, width, height, radius);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = '#374151';
              ctx.font = 'bold 16px Arial';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(
                item.originalId.replace('item-', ''),
                x + width / 2,
                y + height / 2
              );
            }
          } else {
            ctx.fillStyle = '#e5e7eb';
            ctx.strokeStyle = '#d1d5db';
            ctx.lineWidth = 2;

            const radius = 8;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#374151';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              item.originalId.replace('item-', ''),
              x + width / 2,
              y + height / 2
            );
            resolve();
          }
        });
      });

      await Promise.all(loadImagePromises);
    }

    return new Promise(resolve =>
      canvas.toBlob(blob => resolve(blob), 'image/png')
    );
  };

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

      const finalPosition = { x: constrainedX, y: constrainedY };

      const isValidPosition = checkPositionValid(
        finalPosition,
        activeItem,
        canvasItems,
        canvasSize,
        gridSize
      );

      setDropIndicator({
        isVisible: true,
        position: finalPosition,
        size: { width: itemWidth, height: itemHeight },
        isValid: isValidPosition
      });
    } else {
      setDropIndicator(prev => ({ ...prev, isVisible: false }));
    }
  }, [
    dragOverCanvas,
    activeItem,
    dragPosition,
    gridSize,
    canvasSize,
    canvasItems
  ]);

  return (
    <div className='flex-1 bg-gray-50 p-2 w-full'>
      <div className='mb-10 flex items-center justify-between px-4'>
        <h2 className='text-xl font-semibold text-gray-800 pr-8'>
          Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ
        </h2>
        <div className='flex items-center space-x-6'>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={showGrid}
              onChange={() => dispatch({ type: 'giftBox/toggleGrid' })}
              className='rounded'
            />
            <span className='text-sm text-gray-600'>Hiện lưới</span>
          </label>
          <button
            onClick={handleSaveDesign}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded transition-colors duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
          </button>
          <button
            onClick={() => dispatch(clearCanvas())}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'
          >
            Xoá hết quà
          </button>
        </div>
      </div>

      <div className='w-full flex justify-center px-4'>
        <div
          ref={setNodeRef}
          className='relative bg-white border border-gray-300 rounded-xl'
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
            isValid={dropIndicator.isValid}
          />

          {canvasItems &&
            canvasItems.map(item => <CanvasItem key={item.id} item={item} />)}

          {(!canvasItems || canvasItems.length === 0) && (
            <div className='absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none'>
              <div className='text-center'>
                <div className='text-lg mb-2'>🎁</div>
                <div>Kéo thả món quà vào đây</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-8 shadow-xl text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4'></div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Đang xử lý thanh toán
            </h3>
            <p className='text-gray-600'>Vui lòng chờ trong giây lát...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBoxCanvas;
