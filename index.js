// Global variables for Firebase configuration and app ID (will be provided by the environment if applicable)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

import { templateLibrary } from "./templateLibrary.js";

/**
 * This function runs when the entire window content (including images, scripts, etc.) has been loaded.
 * It ensures that all DOM elements are available before script execution.
 */

 window.onload = function() {
    // Application state
    const canvas = document.getElementById('embroideryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = "hue";
    
    // Grid configuration
    const CELL_SIZE = 30; // Size of each grid cell in pixels
    let GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE); // Number of cells horizontally
    let GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE); // Number of cells vertically

    // Set canvas dimensions
    canvas.width = GRID_WIDTH * CELL_SIZE;
    canvas.height = GRID_HEIGHT * CELL_SIZE;
  

// State variables for the designer
let selectedTemplateId = 'square'; // Default template selected
let currentColor = '#BD0603'; // Default drawing color
let pattern = []; // Stores the pattern data: { x, y, templateId, color }

/**
 * MODIFIED: Draws the grid and then redraws all existing pattern elements.
 */
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let i = 0; i <= GRID_WIDTH; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i <= GRID_HEIGHT; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }
    pattern.forEach(item => {
       drawTemplate(item.x, item.y, item.templateId, item.color);
   });
}



/**
 * Finds the correct template from the library and executes its draw method.
 */
function drawTemplate(gridX, gridY, templateId, color) {
    const template = templateLibrary.find(t => t.id === templateId);
    if (!template) return; // Exit if template not found

    const pixelX = gridX * CELL_SIZE;
    const pixelY = gridY * CELL_SIZE;

    // The template's own draw function is called
    template.draw(ctx, pixelX, pixelY, CELL_SIZE, color);

}

/**
 * Handles canvas clicks to add new elements to the pattern.
 */
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = event.clientX || (event.touches && event.touches[0].clientX);
    const clientY = event.clientY || (event.touches && event.touches[0].clientY);

    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    const gridX = Math.floor(mouseX / CELL_SIZE);
    const gridY = Math.floor(mouseY / CELL_SIZE);

    if (gridX >= 0 && gridX < GRID_WIDTH && gridY >= 0 && gridY < GRID_HEIGHT) {
        const existingIndex = pattern.findLastIndex(item => item.x === gridX && item.y === gridY);

        if (selectedTemplateId === 'erase') {
            if (existingIndex !== -1) {
                pattern.splice(existingIndex, 1);
                drawGrid();
                return;
            }
        } else {
            if (!checkForCollision(gridX, gridY)) {
               let item = pattern[pattern.length-1];
               drawTemplate(item.x, item.y, item.templateId, item.color);
            } else {
                drawGrid();
            }
        }
        
    }
}

function checkForCollision(gridX, gridY){
    const newItem = { x: gridX, y: gridY, templateId: selectedTemplateId, color: currentColor };
    const oldIndex = pattern.findIndex(item => item.x === gridX && item.y === gridY && item.templateId === selectedTemplateId);
            if (oldIndex === -1){
                if (selectedTemplateId === 'diag-right' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'cross')){
                    return true;
                }
                if (selectedTemplateId === 'diag-left' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'cross')){
                    return true;
                }
                if (selectedTemplateId === 'line-left' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'square')){
                    return true;
                }
                if (selectedTemplateId === 'line-right' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'square')){
                    return true;
                }
                if (selectedTemplateId === 'line-top' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'square')){
                    return true;
                }
                if (selectedTemplateId === 'line-bottom' && pattern.some(item => item.x === gridX && item.y === gridY && item.templateId === 'square')){
                    return true;
                }
                // No collision, add the item
                pattern.push(newItem);
                return false;            
            } else {
               // If the item already exists, remove it
                pattern.splice(oldIndex, 1);
                return true;
            }
}
/**
 * A single function to handle selecting any template.
 */
function selectTemplate(templateId) {
    selectedTemplateId = templateId;
    const buttons = document.querySelectorAll('.grid-button');
    buttons.forEach(button => {
        if (button.dataset.templateId === templateId) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

/**
* This function now builds the template buttons by creating a mini-canvas
* for each one and running the template's draw function to create the icon.
*/
function populateTemplateLibraryUI() {
const container = document.getElementById('template-library-container');
// Clear any previous buttons
container.innerHTML = ''; 

templateLibrary.forEach(template => {
const button = document.createElement('button');
button.id = `template-${template.id}`;
button.dataset.templateId = template.id;
button.className = 'grid-button p-3 rounded-lg border-2 border-stone-300 bg-white hover:bg-stone-100 flex items-center justify-center';

if (template.isEraser) {
    // For the eraser, we can use a simple SVG as it doesn't have a "stitch" pattern.
    button.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
    button.classList.add('bg-stone-100', 'hover:bg-rose-200', 'text-rose-700');
} else {
    // Create a mini-canvas for the icon
    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = 24;  // Set a fixed small size for the icon
    iconCanvas.height = 24;
    const iconCtx = iconCanvas.getContext('2d');

    // Call the template's own draw function on our mini-canvas!
    // We draw it with a fixed black color and a small inset (padding).
    const padding = 3;
    template.draw(iconCtx, padding, padding, iconCanvas.width - padding * 2, '#374151'); // Using a dark gray color

    button.appendChild(iconCanvas);
}

button.addEventListener('click', () => selectTemplate(template.id));
container.appendChild(button);
});
}

// --- Event Listeners ---
    window.addEventListener("resize", () => {
        //GRID_WIDTH = Math.floor(window.innerWidth / CELL_SIZE); // Number of cells horizontally
        //GRID_HEIGHT = Math.floor(window.innerHeight / CELL_SIZE); // Number of cells vertically
        //canvas.width = GRID_WIDTH * CELL_SIZE;
        //canvas.height = GRID_HEIGHT * CELL_SIZE;
        //ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        drawGrid();
    })

    // No longer need individual listeners for each template button
    document.getElementById('color-picker').addEventListener('input', (event) => {
        currentColor = event.target.value;
    });

    document.getElementById('button-clear').addEventListener('click', () => {
        pattern = [];
        drawGrid();
    });


    document.getElementById('button-undo').addEventListener('click', () => {
        pattern.pop();
        drawGrid();
    });

    document.getElementById('width-picker').addEventListener('input', (event) => {
        GRID_WIDTH = parseInt(event.target.value);
        canvas.width = GRID_WIDTH * CELL_SIZE;
        drawGrid();
    });

    document.getElementById('height-picker').addEventListener('input', (event) => {
        GRID_HEIGHT = parseInt(event.target.value);
        canvas.height = GRID_HEIGHT * CELL_SIZE;
        drawGrid();
    });

   
    document.getElementById('button-download').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'karelian_embroidery_pattern.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleCanvasClick(e.touches[0]);
    }, { passive: false });

    // --- Initial Setup ---
    populateTemplateLibraryUI(); // Create the buttons first
    drawGrid();
    selectTemplate('square'); // Select the default template
};