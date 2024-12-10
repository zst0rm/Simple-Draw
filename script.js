// Toggle between Home and Draw views
function toggleView() {
  const homeView = document.getElementById("homeView");
  const drawView = document.getElementById("drawView");
  homeView.classList.toggle("hidden");
  drawView.classList.toggle("hidden");
}

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color");
const sizeSlider = document.getElementById("size");
const clearButton = document.getElementById("clear");

// Set canvas size dynamically based on the window size
function resizeCanvas() {
  canvas.width = 1050; // Use 90% of the parent width
  canvas.height = 450; // Use 60% of the parent height
}
resizeCanvas();

// Default settings
let drawing = false;
let penColor = "#000000";
let penSize = 5;

// Event listeners for desktop (mouse events)
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Event listeners for mobile (touch events)
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

// Color and size change listeners
colorPicker.addEventListener("input", (e) => (penColor = e.target.value));
sizeSlider.addEventListener("input", (e) => (penSize = e.target.value));
clearButton.addEventListener("click", clearCanvas);

// Start drawing
function startDrawing(e) {
  e.preventDefault(); // Prevent scrolling on touch devices
  drawing = true;

  // Begin a new path to avoid connecting to the previous path
  ctx.beginPath();

  // Get the starting position
  const { x, y } = getPosition(e);
  ctx.moveTo(x, y);
}

// Stop drawing
function stopDrawing(e) {
  e.preventDefault();
  drawing = false;

  // Reset the path to stop connecting lines
  ctx.beginPath();
}

// Draw on canvas
function draw(e) {
  if (!drawing) return;

  e.preventDefault(); // Prevent scrolling on touch devices

  // Get the position of the mouse or touch
  const { x, y } = getPosition(e);

  ctx.lineWidth = penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;

  // Draw a line to the current position
  ctx.lineTo(x, y);
  ctx.stroke();

  // Start a new path for smoother lines
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Get mouse or touch position relative to the canvas
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }
}

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Ensure canvas resizes dynamically
window.addEventListener("resize", resizeCanvas);
