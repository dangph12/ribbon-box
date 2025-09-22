import { createSlice } from '@reduxjs/toolkit';

const GRID_SIZE = 20; // Grid size in pixels
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

// Helper function to check if two items would overlap
const checkCollision = (newItem, existingItems, gridSize) => {
  const newLeft = newItem.position.x;
  const newTop = newItem.position.y;
  const newRight = newLeft + newItem.width * gridSize;
  const newBottom = newTop + newItem.height * gridSize;

  return existingItems.some(item => {
    if (item.id === newItem.id) return false; // Don't check against itself

    const existingLeft = item.position.x;
    const existingTop = item.position.y;
    const existingRight = existingLeft + item.size.width;
    const existingBottom = existingTop + item.size.height;

    // Check if rectangles overlap
    return !(
      newRight <= existingLeft ||
      newLeft >= existingRight ||
      newBottom <= existingTop ||
      newTop >= existingBottom
    );
  });
};

// Helper function to find nearest available position
const findNearestAvailablePosition = (
  item,
  position,
  canvasItems,
  canvasSize,
  gridSize
) => {
  const itemWidth = item.width * gridSize;
  const itemHeight = item.height * gridSize;

  // Start from the desired position and spiral outward
  let testPosition = { ...position };

  // Snap to grid first
  testPosition.x = snapToGrid(testPosition.x, gridSize);
  testPosition.y = snapToGrid(testPosition.y, gridSize);

  // Check if current position is valid
  const testItem = { ...item, position: testPosition };

  if (
    !checkCollision(testItem, canvasItems, gridSize) &&
    testPosition.x + itemWidth <= canvasSize.width &&
    testPosition.y + itemHeight <= canvasSize.height &&
    testPosition.x >= 0 &&
    testPosition.y >= 0
  ) {
    return testPosition;
  }

  // If not valid, search for nearest available position
  const maxDistance = Math.max(canvasSize.width, canvasSize.height);

  for (let distance = gridSize; distance < maxDistance; distance += gridSize) {
    // Try positions in a spiral pattern
    for (let angle = 0; angle < 360; angle += 45) {
      const radians = (angle * Math.PI) / 180;
      const offsetX =
        Math.round((Math.cos(radians) * distance) / gridSize) * gridSize;
      const offsetY =
        Math.round((Math.sin(radians) * distance) / gridSize) * gridSize;

      const candidatePosition = {
        x: snapToGrid(position.x + offsetX, gridSize),
        y: snapToGrid(position.y + offsetY, gridSize)
      };

      // Check bounds
      if (
        candidatePosition.x < 0 ||
        candidatePosition.y < 0 ||
        candidatePosition.x + itemWidth > canvasSize.width ||
        candidatePosition.y + itemHeight > canvasSize.height
      ) {
        continue;
      }

      const candidateItem = { ...item, position: candidatePosition };

      if (!checkCollision(candidateItem, canvasItems, gridSize)) {
        return candidatePosition;
      }
    }
  }

  // If no position found, return original position (this shouldn't happen often)
  return testPosition;
};

const initialState = {
  canvasItems: [],
  selectedItemId: null,
  canvasSize: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT
  },
  gridSize: GRID_SIZE,
  showGrid: true,
  draggedItem: null
};

const giftBoxSlice = createSlice({
  name: 'giftBox',
  initialState,
  reducers: {
    addItemToCanvas: (state, action) => {
      if (!state.canvasItems) {
        state.canvasItems = [];
      }

      const { item, position } = action.payload;
      const snappedPosition = {
        x: snapToGrid(position.x, state.gridSize),
        y: snapToGrid(position.y, state.gridSize)
      };

      // Find available position to prevent overlap
      const availablePosition = findNearestAvailablePosition(
        item,
        snappedPosition,
        state.canvasItems,
        state.canvasSize,
        state.gridSize
      );

      const newItem = {
        ...item,
        id: `canvas-${item.id}-${Date.now()}`, // Unique ID for canvas item
        originalId: item.id,
        position: availablePosition,
        size: {
          width: item.width * state.gridSize,
          height: item.height * state.gridSize
        }
      };

      state.canvasItems.push(newItem);
    },

    moveItemOnCanvas: (state, action) => {
      const { itemId, position } = action.payload;
      const item = state.canvasItems.find(item => item.id === itemId);
      if (item) {
        const snappedPosition = {
          x: snapToGrid(position.x, state.gridSize),
          y: snapToGrid(position.y, state.gridSize)
        };

        // Create a temporary item for collision checking (excluding itself)
        const tempItem = {
          ...item,
          position: snappedPosition,
          width: item.size.width / state.gridSize,
          height: item.size.height / state.gridSize
        };
        const otherItems = state.canvasItems.filter(i => i.id !== itemId);

        // Find available position to prevent overlap
        const availablePosition = findNearestAvailablePosition(
          tempItem,
          snappedPosition,
          otherItems,
          state.canvasSize,
          state.gridSize
        );

        // Ensure the position is within canvas bounds
        item.position = {
          x: Math.max(
            0,
            Math.min(
              availablePosition.x,
              state.canvasSize.width - item.size.width
            )
          ),
          y: Math.max(
            0,
            Math.min(
              availablePosition.y,
              state.canvasSize.height - item.size.height
            )
          )
        };
      }
    },

    removeItemFromCanvas: (state, action) => {
      const itemId = action.payload;
      state.canvasItems = state.canvasItems.filter(item => item.id !== itemId);
      if (state.selectedItemId === itemId) {
        state.selectedItemId = null;
      }
    },

    selectItem: (state, action) => {
      state.selectedItemId = action.payload;
    },

    deselectItem: state => {
      state.selectedItemId = null;
    },

    toggleGrid: state => {
      state.showGrid = !state.showGrid;
    },

    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },

    setCanvasSize: (state, action) => {
      state.canvasSize = action.payload;
    },

    setDraggedItem: (state, action) => {
      state.draggedItem = action.payload;
    },

    clearCanvas: state => {
      state.canvasItems = [];
      state.selectedItemId = null;
    },

    resizeItem: (state, action) => {
      const { itemId, size } = action.payload;
      const item = state.canvasItems.find(item => item.id === itemId);
      if (item) {
        item.size = {
          width: snapToGrid(size.width, state.gridSize),
          height: snapToGrid(size.height, state.gridSize)
        };
      }
    },

    saveDesignData: state => {
      const designData = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        canvasSize: {
          width: state.canvasSize.width,
          height: state.canvasSize.height
        },
        gridSize: state.gridSize,
        items: state.canvasItems.map(item => ({
          id: item.id,
          originalId: item.originalId,
          position: {
            x: item.position.x,
            y: item.position.y
          },
          size: {
            width: item.size.width,
            height: item.size.height
          }
        })),
        metadata: {
          version: '1.0',
          totalItems: state.canvasItems.length,
          appName: 'Ribbon Box Designer'
        }
      };

      console.log('🎁 Gift Box Design Data:', designData);
      console.log('📋 JSON for server:', JSON.stringify(designData, null, 2));

      return designData;
    }
  }
});

export const {
  addItemToCanvas,
  moveItemOnCanvas,
  removeItemFromCanvas,
  selectItem,
  deselectItem,
  toggleGrid,
  setGridSize,
  setCanvasSize,
  setDraggedItem,
  clearCanvas,
  resizeItem,
  saveDesignData
} = giftBoxSlice.actions;

export default giftBoxSlice.reducer;
