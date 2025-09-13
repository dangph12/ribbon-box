import { createSlice } from '@reduxjs/toolkit';

const GRID_SIZE = 20; // Grid size in pixels
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

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
      const newItem = {
        ...item,
        id: `canvas-${item.id}-${Date.now()}`, // Unique ID for canvas item
        originalId: item.id,
        position: {
          x: snapToGrid(position.x, state.gridSize),
          y: snapToGrid(position.y, state.gridSize)
        },
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
        item.position = {
          x: Math.max(
            0,
            Math.min(
              snapToGrid(position.x, state.gridSize),
              state.canvasSize.width - item.size.width
            )
          ),
          y: Math.max(
            0,
            Math.min(
              snapToGrid(position.y, state.gridSize),
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
