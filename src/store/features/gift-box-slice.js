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
      // Ensure canvasItems is always an array
      if (!state.canvasItems) {
        state.canvasItems = [];
      }

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
    },

    saveDesignData: state => {
      // Create JSON data structure
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

      // Console log the JSON data
      console.log('🎁 Gift Box Design Data:', designData);
      console.log('📋 JSON for server:', JSON.stringify(designData, null, 2));

      return designData;
    },

    generateCanvasImage: state => {
      // Create a canvas element for image generation
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size
      canvas.width = state.canvasSize.width;
      canvas.height = state.canvasSize.height;

      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid if enabled
      if (state.showGrid) {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 0.5;

        // Vertical lines
        for (let x = 0; x <= state.canvasSize.width; x += state.gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, state.canvasSize.height);
          ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= state.canvasSize.height; y += state.gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(state.canvasSize.width, y);
          ctx.stroke();
        }
      }

      // Draw items
      if (state.canvasItems && Array.isArray(state.canvasItems)) {
        const loadImagePromises = state.canvasItems.map(item => {
          return new Promise((resolve) => {
            const x = item.position.x;
            const y = item.position.y;
            const width = item.size.width;
            const height = item.size.height;

            // Try to load and draw image
            if (item.image) {
              const img = new Image();
              img.crossOrigin = 'anonymous'; // Handle CORS
              img.onload = () => {
                try {
                  // Save the current context state
                  ctx.save();
                  
                  // Create a clipping region for the rounded rectangle
                  const radius = 8;
                  ctx.beginPath();
                  ctx.roundRect(x, y, width, height, radius);
                  ctx.clip();
                  
                  // Draw the image to fill the entire area
                  ctx.drawImage(img, x, y, width, height);
                  
                  // Restore the context state
                  ctx.restore();
                } catch (error) {
                  console.warn('Error drawing image:', error);
                  // Fallback to background with text
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
        Promise.all(loadImagePromises).then(() => {
          // Convert to blob and download
          canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `gift-box-design-${Date.now()}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            console.log('📷 Canvas image downloaded successfully!');
          }, 'image/png');
        });
      } else {
        // No items, just save the canvas as is
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `gift-box-design-${Date.now()}.png`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          console.log('📷 Canvas image downloaded successfully!');
        }, 'image/png');
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
  resizeItem,
  saveDesignData,
  generateCanvasImage
} = giftBoxSlice.actions;

export default giftBoxSlice.reducer;
