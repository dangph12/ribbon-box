import { useDispatch, useSelector } from 'react-redux';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import GiftItemsContainer from '~/components/gift-items-container';
import GiftBoxCanvas from '~/components/gift-box-canvas';
import {
  addItemToCanvas,
  moveItemOnCanvas
} from '~/store/features/gift-box-slice';
import { useState } from 'react';
import DragPreview from '~/components/drag-preview';

const Page = () => {
  const dispatch = useDispatch();
  const { gridSize } = useSelector(state => state.giftBox);
  const [activeItem, setActiveItem] = useState(null);
  const [dragOverCanvas, setDragOverCanvas] = useState(false);
  const [dragPosition, setDragPosition] = useState(null); // Changed from { x: 0, y: 0 } to null

  const handleDragStart = event => {
    setActiveItem(event.active.data.current);
    setDragPosition(null); // Reset drag position when starting to drag
  };

  const handleDragMove = event => {
    const { over } = event;
    if (over && over.id === 'canvas') {
      setDragOverCanvas(true);
      // Calculate position relative to the canvas
      const canvasRect = over.rect;
      const dragX =
        (event.active.rect.current.translated?.left || 0) - canvasRect.left;
      const dragY =
        (event.active.rect.current.translated?.top || 0) - canvasRect.top;

      setDragPosition({ x: dragX, y: dragY });
    } else {
      setDragOverCanvas(false);
      setDragPosition(null); // Clear position when not over canvas
    }
  };

  const handleDragOver = event => {
    const { over } = event;
    if (over && over.id === 'canvas') {
      setDragOverCanvas(true);
    } else {
      setDragOverCanvas(false);
    }
  };

  const handleDragEnd = event => {
    const { active, over } = event;
    setActiveItem(null);
    setDragOverCanvas(false);
    setDragPosition(null); // Clear position on drag end

    if (over && over.id === 'canvas') {
      const canvasRect = over.rect;
      const activeRect = active.rect.current.translated;
      const item = active.data.current;

      // Calculate drop position relative to canvas
      const dropPosition = {
        x: Math.max(0, activeRect ? activeRect.left - canvasRect.left : 0),
        y: Math.max(0, activeRect ? activeRect.top - canvasRect.top : 0)
      };

      if (item.originalId) {
        // Moving existing canvas item
        dispatch(
          moveItemOnCanvas({
            itemId: active.id,
            position: dropPosition
          })
        );
      } else {
        // Adding new item from sidebar
        dispatch(
          addItemToCanvas({
            item,
            position: dropPosition
          })
        );
      }
    }
  };

  return (
    <div className='h-screen bg-gray-100 overflow-hidden'>
      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='flex h-full max-w-full'>
          <GiftItemsContainer />
          <GiftBoxCanvas
            activeItem={activeItem}
            dragOverCanvas={dragOverCanvas}
            dragPosition={dragPosition}
          />
        </div>
        <DragOverlay>
          <DragPreview item={activeItem} gridSize={gridSize} />
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Page;
