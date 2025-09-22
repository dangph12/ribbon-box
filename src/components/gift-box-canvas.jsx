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

const GiftBoxCanvas = ({ activeItem, dragOverCanvas, dragPosition }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    canvasItems = [],
    canvasSize = { width: 800, height: 600 },
    gridSize = 20,
    showGrid = true,
    selectedItemId = null,
  } = useSelector((state) => state.giftBox || {});

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

  const downloadImage = (blob) => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `gift-box-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("📷 Canvas image downloaded successfully!");
  };

  const handleSaveDesign = async () => {
    dispatch(saveDesignData());

    const blob = await generateCanvasImage();
    if (!blob) return;

    downloadImage(blob);

    const url = URL.createObjectURL(blob);
    console.log("Navigating to /preview with url:", url);

    navigate("/preview", { state: { url } });

    setTimeout(() => {
      dispatch(clearCanvas());
    }, 500);
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
      const loadImagePromises = canvasItems.map((item) => {
        return new Promise((resolve) => {
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
              // Draw gray background for fallback
              ctx.fillStyle = '#e5e7eb'; // gray-200
              ctx.strokeStyle = '#d1d5db'; // gray-300
              ctx.lineWidth = 2;

              const radius = 8;
              ctx.beginPath();
              ctx.roundRect(x, y, width, height, radius);
              ctx.fill();
              ctx.stroke();

              // Draw text
              ctx.fillStyle = '#374151'; // gray-700
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
            // No image, draw gray background with text
            ctx.fillStyle = '#e5e7eb'; // gray-200
            ctx.strokeStyle = '#d1d5db'; // gray-300
            ctx.lineWidth = 2;

            const radius = 8;
            ctx.beginPath();
            ctx.roundRect(x, y, width, height, radius);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#374151'; // gray-700
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

      // Wait for all images to load before generating the final image
      await Promise.all(loadImagePromises);
    }

    // Download the canvas
    return new Promise((resolve) =>
      canvas.toBlob((blob) => resolve(blob), 'image/png')
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

      setDropIndicator({
        isVisible: true,
        position: {
          x: constrainedX,
          y: constrainedY
        },
        size: { width: itemWidth, height: itemHeight },
      });
    } else {
      setDropIndicator((prev) => ({ ...prev, isVisible: false }));
    }
  }, [dragOverCanvas, activeItem, dragPosition, gridSize, canvasSize]);

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Gift Box Canvas</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => dispatch({ type: "giftBox/toggleGrid" })}
              className="rounded"
            />
            <span className="text-sm text-gray-600">Show Grid</span>
          </label>
          <button
            onClick={handleSaveDesign}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
          >
            Save Design
          </button>
          <button
            onClick={() => dispatch(clearCanvas())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 inline-block">
        <div
          ref={setNodeRef}
          className="relative bg-white"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            minWidth: canvasSize.width,
            minHeight: canvasSize.height,
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
            canvasItems.map((item) => <CanvasItem key={item.id} item={item} />)}

          {(!canvasItems || canvasItems.length === 0) && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
              <div className="text-center">
                <div className="text-lg mb-2">🎁</div>
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
