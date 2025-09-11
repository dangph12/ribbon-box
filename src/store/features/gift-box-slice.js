import { createSlice } from '@reduxjs/toolkit';

const GRID_SIZE = 20; // Grid size in pixels
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const initialState = {
  canvasItems: [], // Items placed on the canvas
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
      const { item, position } = action.payload;
      const newItem = {
        ...item,
        id: `canvas-${item.id}-${Date.now()}`, // Unique ID for canvas item
        originalId: item.id,
        position: {
          x: Math.round(position.x / state.gridSize) * state.gridSize,
          y: Math.round(position.y / state.gridSize) * state.gridSize
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
              Math.round(position.x / state.gridSize) * state.gridSize,
              state.canvasSize.width - item.size.width
            )
          ),
          y: Math.max(
            0,
            Math.min(
              Math.round(position.y / state.gridSize) * state.gridSize,
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
          width: Math.round(size.width / state.gridSize) * state.gridSize,
          height: Math.round(size.height / state.gridSize) * state.gridSize
        };
      }
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
  resizeItem
} = giftBoxSlice.actions;

export default giftBoxSlice.reducer;
